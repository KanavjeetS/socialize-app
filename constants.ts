import { Activity, ChatGroup, User, Achievement } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  { 
    id: 'early-bird', 
    title: 'Early Bird', 
    description: 'Joined 5 morning events before 8 AM', 
    emoji: '🌅', 
    gradient: 'from-yellow-300 to-orange-500', 
    unlocked: true 
  },
  { 
    id: 'night-owl', 
    title: 'Night Owl', 
    description: 'Active in 3 events after midnight', 
    emoji: '🦉', 
    gradient: 'from-indigo-500 to-purple-600', 
    unlocked: true 
  },
  { 
    id: 'social-butterfly', 
    title: 'Social Butterfly', 
    description: 'Attended 50+ events this year', 
    emoji: '🦋', 
    gradient: 'from-pink-400 to-rose-500', 
    unlocked: true 
  },
  { 
    id: 'explorer', 
    title: 'Explorer', 
    description: 'Visited 10 different neighborhoods', 
    emoji: '🧭', 
    gradient: 'from-emerald-400 to-teal-500', 
    unlocked: false,
    progress: '7/10'
  },
  { 
    id: 'foodie', 
    title: 'Super Foodie', 
    description: 'Hosted 5 dinner parties', 
    emoji: '🍔', 
    gradient: 'from-orange-400 to-red-500', 
    unlocked: true 
  },
  { 
    id: 'vip', 
    title: 'VIP Host', 
    description: 'Maintained 5.0 rating for 3 months', 
    emoji: '👑', 
    gradient: 'from-amber-300 to-yellow-500', 
    unlocked: false,
    progress: '2/3 months'
  },
  { 
    id: 'sporty', 
    title: 'Gym Rat', 
    description: 'Participated in 20 sports activities', 
    emoji: '💪', 
    gradient: 'from-blue-400 to-indigo-500', 
    unlocked: true 
  },
  { 
    id: 'gamer', 
    title: 'Level Up', 
    description: 'Won 3 competitive gaming nights', 
    emoji: '👾', 
    gradient: 'from-purple-500 to-pink-500', 
    unlocked: false,
    progress: '1/3'
  },
];

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  avatar: 'https://picsum.photos/100/100?random=1',
  // Stylish abstract banner
  banner: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop', 
  trustScore: 94,
  isVerified: true,
  badges: ['Reliable', 'Top Rated'],
  equippedBadge: ACHIEVEMENTS[2], // Social Butterfly equipped by default
};

export const MOCK_USERS: User[] = [
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/100/100?random=2', trustScore: 98, isVerified: true, badges: ['Verified'] },
  { id: 'u3', name: 'Mike Ross', avatar: 'https://picsum.photos/100/100?random=3', trustScore: 88, isVerified: true, badges: [] },
  { id: 'u4', name: 'Jessica Wu', avatar: 'https://picsum.photos/100/100?random=4', trustScore: 92, isVerified: true, badges: ['Pro'] },
  { id: 'u5', name: 'Tom Hardy', avatar: 'https://picsum.photos/100/100?random=5', trustScore: 85, isVerified: false, badges: [] },
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Sunset Tennis Doubles 🎾',
    description: 'Looking for 2 intermediate players for a doubles match at Central Park courts. Casual vibes but competitive!',
    category: 'Sports',
    host: MOCK_USERS[0],
    time: 'Today, 6:00 PM',
    location: 'Central Park Courts',
    participants: [MOCK_USERS[0], MOCK_USERS[1]],
    maxParticipants: 4,
    cost: '$15 split',
    image: 'https://picsum.photos/600/400?random=10',
    safetyLevel: 'High',
    tags: ['Tennis', 'Outdoor', 'Intermediate'],
    distance: '0.8 mi',
  },
  {
    id: 'a2',
    title: 'Hidden Jazz Bar Exploration 🎷',
    description: 'Checking out the new speakeasy downtown. First round is on me if you have a good jazz playlist!',
    category: 'Nightlife',
    host: MOCK_USERS[2],
    time: 'Tonight, 9:00 PM',
    location: 'The Blue Note',
    participants: [MOCK_USERS[2], MOCK_USERS[3], MOCK_USERS[1]],
    maxParticipants: 5,
    cost: '$$ - $$$',
    image: 'https://picsum.photos/600/400?random=11',
    safetyLevel: 'Medium',
    tags: ['Jazz', 'Drinks', 'Music'],
    distance: '1.2 mi',
  },
  {
    id: 'a3',
    title: 'Sunday Morning Coffee & Code ☕',
    description: 'Casual coworking session at a quiet cafe. Bring your laptop and your side project.',
    category: 'Cafe',
    host: MOCK_USERS[1],
    time: 'Sun, 10:00 AM',
    location: 'Bean & Leaf',
    participants: [MOCK_USERS[1]],
    maxParticipants: 6,
    cost: 'Your own',
    image: 'https://picsum.photos/600/400?random=12',
    safetyLevel: 'High',
    tags: ['Tech', 'Chill', 'Productivity'],
    distance: '0.3 mi',
  },
  {
    id: 'a4',
    title: 'Photography Walk: Urban Decay 📷',
    description: 'Walking tour of the old industrial district to capture some gritty textures. Beginners welcome!',
    category: 'Hobby',
    host: MOCK_USERS[3],
    time: 'Sat, 2:00 PM',
    location: 'Navy Yard',
    participants: [MOCK_USERS[3], MOCK_USERS[0]],
    maxParticipants: 8,
    cost: 'Free',
    image: 'https://picsum.photos/600/400?random=13',
    safetyLevel: 'Standard',
    tags: ['Photo', 'Walk', 'Art'],
    distance: '2.5 mi',
  },
];

export const CHATS: ChatGroup[] = [
  {
    id: 'c1',
    activityId: 'a1',
    title: 'Sunset Tennis Doubles 🎾',
    lastMessage: 'I’m bringing extra balls!',
    timestamp: '2m ago',
    unreadCount: 2,
    participants: ['u1', 'u2'],
    expiresIn: '4h',
  },
  {
    id: 'c2',
    activityId: 'a2',
    title: 'Hidden Jazz Bar 🎷',
    lastMessage: 'Where exactly is the entrance?',
    timestamp: '15m ago',
    unreadCount: 0,
    participants: ['u3', 'u4', 'u2'],
    expiresIn: '12h',
  },
];

export const INTERESTS = [
  'Hiking', 'Coffee', 'Tennis', 'Photography', 'Nightlife', 'Cinema', 'Reading', 'Coding', 'Yoga', 'Foodie'
];