export type ViewState = 'AUTH' | 'ONBOARDING' | 'HOME' | 'EXPLORE' | 'CREATE' | 'CHATS' | 'PROFILE' | 'SETTINGS' | 'ACTIVITY_DETAIL';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  unlocked: boolean;
  progress?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  banner?: string; // Custom profile banner URL
  trustScore: number;
  isVerified: boolean;
  badges: string[];
  vibe?: string;
  bio?: string;
  equippedBadge?: Achievement;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'Sports' | 'Cafe' | 'Travel' | 'Event' | 'Hobby' | 'Nightlife';
  host: User;
  time: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  participants: User[];
  maxParticipants: number;
  cost: string;
  image: string;
  safetyLevel: 'High' | 'Medium' | 'Standard';
  tags: string[];
  distance: string;
}

export interface ChatGroup {
  id: string;
  activityId: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  participants: string[];
  expiresIn: string; // "24h"
  image?: string; // Group image
}

export interface Message {
  id: string;
  senderId: string; // 'me' or user id
  senderName?: string;
  avatar?: string;
  text?: string;
  image?: string;
  audioUrl?: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'audio' | 'file';
  fileName?: string;
  fileSize?: string;
  audioDuration?: string;
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: any;
}