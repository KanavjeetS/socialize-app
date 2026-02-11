# SOCIALIZE: React Native Production Blueprint

This document contains the source code to deploy the **SOCIALIZE** UI as a native mobile app using **Expo**, **NativeWind (Tailwind)**, and **Reanimated**.

## 1. Tech Stack
- **Framework**: [Expo SDK 50+](https://expo.dev)
- **Navigation**: [Expo Router (v3)](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind (v4)](https://www.nativewind.dev/) (Tailwind for RN)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Blur/Glass**: [expo-blur](https://docs.expo.dev/versions/latest/sdk/blur/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)

---

## 2. Configuration (`tailwind.config.js`)
*Copy the web config, but map colors for NativeWind.*

```javascript
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          800: '#3f3f46',
          900: '#18181b',
          950: '#09090b',
        },
        brand: {
          primary: '#f97316',
          secondary: '#0ea5e9',
          accent: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
```

---

## 3. Core Components

### Glass Card (The core UI primitive)
*Uses `BlurView` for the glass effect, replacing the CSS `backdrop-filter`.*

```tsx
// components/GlassCard.tsx
import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { cn } from '../utils/cn'; // Standard className utility

interface GlassCardProps extends ViewProps {
  onPress?: () => void;
  variant?: 'base' | 'highlight' | 'dark';
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  onPress, 
  variant = 'base',
  intensity = 20,
  ...props 
}) => {
  const Container = onPress ? Pressable : View;
  
  // Variant Styles
  const bgStyle = {
    base: 'bg-white/5 border-white/10',
    highlight: 'bg-brand-primary/10 border-brand-primary/30',
    dark: 'bg-black/40 border-white/5',
  }[variant];

  return (
    <Container 
      onPress={onPress}
      className={cn(
        "rounded-3xl overflow-hidden border", 
        bgStyle,
        onPress && "active:scale-98 active:opacity-90", // Native interaction
        className
      )}
      {...props}
    >
      <BlurView intensity={intensity} tint="dark" className="p-4 flex-1">
        {children}
      </BlurView>
    </Container>
  );
};
```

### Action Button
*Uses `Pressable` with Reanimated for the ripple/scale effects.*

```tsx
// components/Button.tsx
import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const Button = ({ children, onPress, variant = 'primary', isLoading, fullWidth }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => (scale.value = withSpring(0.95));
  const handlePressOut = () => (scale.value = withSpring(1));

  const Wrapper = variant === 'primary' ? LinearGradient : Pressable;
  const gradientProps = variant === 'primary' 
    ? { colors: ['#f97316', '#0ea5e9'], start: {x:0, y:0}, end: {x:1, y:1} } 
    : {};

  return (
    <Animated.View style={[animatedStyle, fullWidth && { width: '100%' }]}>
      <Wrapper
        {...gradientProps}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        className={`
          h-14 rounded-2xl flex-row items-center justify-center px-6
          ${variant === 'glass' ? 'bg-white/10 border border-white/20' : ''}
          ${variant === 'ghost' ? 'bg-transparent' : ''}
        `}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base tracking-wide">{children}</Text>
        )}
      </Wrapper>
    </Animated.View>
  );
};
```

---

## 4. Feature Screens

### Chat Screen (ChatDetail)
*Refactored to use `KeyboardAvoidingView` and `FlatList`.*

```tsx
// app/chat/[id].tsx
import React, { useState, useRef } from 'react';
import { View, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { GlassCard } from '../../components/GlassCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Send } from 'lucide-react-native';

export default function ChatDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState('');
  
  const renderMessage = ({ item }) => {
    const isMe = item.senderId === 'me';
    return (
      <View className={`flex-row mb-4 px-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
        <View 
          className={`
            max-w-[80%] p-4 rounded-2xl
            ${isMe ? 'bg-brand-primary rounded-tr-none' : 'bg-white/10 rounded-tl-none'}
          `}
        >
          <Text className="text-white text-base leading-6">{item.text}</Text>
          <Text className="text-white/50 text-[10px] mt-1 self-end">{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-royal-950">
      {/* Galaxy Background Component would go here absolutely positioned */}
      
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="px-4 py-2 flex-row items-center gap-4 border-b border-white/5 bg-royal-950/80">
          <Button variant="ghost" onPress={() => router.back()}>
            <ArrowLeft color="white" size={24} />
          </Button>
          <View>
            <Text className="text-white font-bold text-lg">Tennis Doubles 🎾</Text>
            <Text className="text-brand-primary text-xs">Active now</Text>
          </View>
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 20 }}
          inverted={false} // Depending on data order
        />

        {/* Input Area */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <GlassCard className="m-4 flex-row items-center gap-2 p-2 rounded-full" intensity={40}>
            <TextInput 
              value={text}
              onChangeText={setText}
              placeholder="Type a message..."
              placeholderTextColor="#64748b"
              className="flex-1 text-white text-base px-4 h-10"
            />
            <Button variant="primary" size="icon" onPress={handleSend}>
              <Send color="white" size={20} />
            </Button>
          </GlassCard>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
```

### Home Screen
*Using `ScrollView` and Horizontal `FlatList` for the feed.*

```tsx
// app/(tabs)/index.tsx
import { ScrollView, View, Text, Image } from 'react-native';
import { GlassCard } from '../../components/GlassCard';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-royal-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="pt-16 px-6 mb-6">
          <Text className="text-white text-3xl font-bold">SOCIALIZE</Text>
          <View className="flex-row items-center gap-2 mt-1">
             <MapPin size={14} color="#f97316" />
             <Text className="text-slate-400">New York City</Text>
          </View>
        </View>

        {/* Horizontal Scroll (Nearby) */}
        <Text className="text-white text-lg font-bold px-6 mb-4">Happening Nearby</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-6 mb-8">
          {ACTIVITIES.map(activity => (
            <GlassCard 
              key={activity.id} 
              className="w-72 mr-4 h-80 p-0"
              onPress={() => router.push(`/activity/${activity.id}`)}
            >
              <Image source={{ uri: activity.image }} className="w-full h-48" />
              <View className="p-4">
                <Text className="text-white font-bold text-lg">{activity.title}</Text>
                <Text className="text-slate-400 text-xs mt-2">{activity.time}</Text>
              </View>
            </GlassCard>
          ))}
        </ScrollView>

        {/* Vertical Feed */}
        <Text className="text-white text-lg font-bold px-6 mb-4">For You</Text>
        <View className="px-6 gap-4">
           {/* Mapped Activity Cards */}
        </View>
      </ScrollView>
    </View>
  );
}
```

---

## 5. Navigation Structure (Expo Router)

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090b' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="activity/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="chat/[id]" />
      </Stack>
    </>
  );
}
```

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Home, Compass, Plus, MessageCircle, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute', bottom: 0, height: 80, borderTopWidth: 0, elevation: 0 },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={80} style={{ flex: 1, backgroundColor: 'rgba(9,9,11,0.8)' }} />
        ),
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#64748b',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ tabBarIcon: ({ color }) => <Home color={color} size={24} /> }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          tabBarIcon: () => (
            <View className="bg-brand-primary w-12 h-12 rounded-full items-center justify-center -mt-8 shadow-lg shadow-orange-500/50">
              <Plus color="white" size={28} />
            </View>
          ) 
        }} 
      />
      {/* Other tabs... */}
    </Tabs>
  );
}
```
