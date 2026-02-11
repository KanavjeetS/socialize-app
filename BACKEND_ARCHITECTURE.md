# SOCIALIZE - Backend Architecture Blueprint

This document outlines the production-ready backend architecture for the SOCIALIZE mobile application.

---

## 1. High-Level Architecture
**Stack**: Cloud-Native Microservices
- **Runtime**: Node.js (TypeScript) / Python (AI Services)
- **Database**: PostgreSQL (Relational + Vector)
- **Cache/PubSub**: Redis
- **Object Storage**: AWS S3 / Google Cloud Storage
- **Orchestration**: Kubernetes / Docker Swarm

### Service Map
1.  **Gateway Service**: API Gateway handling SSL, Rate Limiting, Auth Validation.
2.  **Identity Service**: User profiles, Authentication, KYC/Verification.
3.  **Activity Service**: Core CRUD, Geospatial indexing, Participant management.
4.  **Chat Service**: Ephemeral messaging, WebSocket handling.
5.  **Intelligence Service**: AI Agents for recommendations, moderation, and concierge.
6.  **Trust Service**: Reputation scoring engine, Reporting workflow.

---

## 2. Database Schema (PostgreSQL)

### Identity & Profiles
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  full_name VARCHAR(100),
  avatar_key TEXT, -- S3 Key
  bio TEXT,
  vibe_tags TEXT[], -- ['Chill', 'Sporty']
  trust_score INTEGER DEFAULT 50, -- 0 to 100
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verifications (
  user_id UUID REFERENCES users(id),
  document_type VARCHAR(50),
  document_key TEXT, -- Encrypted S3 Key
  status VARCHAR(20) DEFAULT 'PENDING',
  admin_notes TEXT,
  verified_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, document_type)
);
```

### Core Activity System
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  host_id UUID REFERENCES users(id),
  title VARCHAR(150),
  description TEXT,
  category VARCHAR(50),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location_name VARCHAR(255),
  location_geom GEOMETRY(POINT, 4326), -- PostGIS for geospatial queries
  max_participants INTEGER DEFAULT 4,
  cost_split VARCHAR(50),
  safety_level VARCHAR(20), -- 'High', 'Medium', 'Standard'
  embedding VECTOR(1536), -- AI Vector for semantic search
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE participants (
  activity_id UUID REFERENCES activities(id),
  user_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'PENDING', -- 'JOINED', 'WAITLIST', 'DECLINED'
  role VARCHAR(20) DEFAULT 'GUEST',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (activity_id, user_id)
);
```

### Ephemeral Chat System
```sql
CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID REFERENCES activities(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL, -- Auto-cleanup trigger based on this
  is_archived BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chat_rooms(id),
  sender_id UUID REFERENCES users(id),
  content TEXT, -- Encrypted
  media_key TEXT,
  type VARCHAR(20) DEFAULT 'TEXT',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Trust & Safety
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  reporter_id UUID REFERENCES users(id),
  target_id UUID REFERENCES users(id),
  reason TEXT,
  status VARCHAR(20) DEFAULT 'OPEN',
  risk_level VARCHAR(20) -- 'LOW', 'HIGH', 'CRITICAL'
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY,
  activity_id UUID REFERENCES activities(id),
  reviewer_id UUID REFERENCES users(id),
  target_user_id UUID REFERENCES users(id),
  rating INTEGER, -- 1-5
  tags TEXT[]
);
```

---

## 3. API Architecture (REST + WebSocket)

### Authentication
- `POST /auth/signup`: Create account, trigger email verification.
- `POST /auth/login`: Exchange credentials for `access_token` (JWT) and `refresh_token`.
- `POST /auth/verify-otp`: 2FA for phone number.
- `POST /auth/kyc/upload`: Secure upload URL for ID documents.

### Activities
- `GET /activities/nearby`: Query using PostGIS `ST_DWithin` (radius search).
- `GET /activities/recommended`: Hybrid search (Vector Similarity + Geospatial).
- `POST /activities`: Create activity (Triggers AI Safety Scan on description).
- `POST /activities/:id/join`: Request to join.

### Chat (Realtime)
- **Protocol**: WebSocket (Socket.io)
- **Events**:
  - `join_room`: Client joins `room_{activity_id}`.
  - `send_message`: Client sends payload `{ text, type }`.
  - `new_message`: Server broadcasts to room.
  - `typing_indicator`: Ephemeral typing status.
- **Persistence**: Messages stored in DB, pushed to Redis for active socket fan-out.

---

## 4. AI & Agentic Systems

### A. Recommendation Agent
**Goal**: Optimize feed relevance.
**Logic**:
1.  **Vectorization**: Every time an activity is created, the title/description/tags are converted to embeddings (via OpenAI/Gemini) and stored in `activities.embedding`.
2.  **User Profile**: A dynamic vector is maintained for each user based on their history (what they clicked, joined, liked).
3.  **Query**: `CosSim(UserVector, ActivityVector)` + `DistanceDecay` + `TrustScoreBoost`.

### B. Moderation Agent
**Goal**: Realtime safety in chats and posts.
**Workflow**:
1.  **Ingest**: Intercepts `POST /activities` and `socket.on('send_message')`.
2.  **Analyze**: Sends text to LLM Classification Endpoint.
3.  **Act**:
    - **Safe**: Pass through.
    - **Toxic**: Block content, return error to user.
    - **Severe**: Block content, Auto-Create `Report`, Deduct Trust Score.

### C. Concierge Agent
**Goal**: Plan generation.
**Workflow**:
1.  Receives natural language prompt ("Midnight jazz in Tokyo").
2.  Retrieves relevant POI (Points of Interest) from external Maps API.
3.  Formats a structured plan.
4.  Returns JSON to frontend.

---

## 5. Security & Trust Infrastructure

### Identity Verification
- **Flow**: User uploads photo of ID -> Server requests OCR/Verification Provider -> Result updates `is_verified`.
- **Encryption**: All PII (ID numbers, phone) encrypted at rest using AES-256.

### Trust Score Engine
Dynamic scoring algorithm running as a background worker:
- **Base**: 50 Points.
- **+20**: ID Verified.
- **+5**: Per successful activity hosted (no reports).
- **+1**: Per positive review.
- **-50**: Substantiated Report.
- **-10**: No-show (verified by geolocation check-in).

### Access Control
- **JWT**: Stateless auth for API scaling.
- **RLS**: Row-Level Security on Database for extra layer of data isolation.
- **Rate Limiting**: Redis-based sliding window (prevent scraping/spam).

---

## 6. Deployment Strategy
- **Containerization**: Docker images for each service.
- **Orchestration**: Kubernetes (EKS/GKE).
- **CI/CD**: GitHub Actions pipeline -> Run Tests -> Build Images -> Deploy to Staging -> Manual Approval -> Prod.
- **Scaling**: Horizontal Pod Autoscaling (HPA) based on CPU/Memory and WebSocket connection count.
