import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

type TabBarIconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => (
  <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />
);

// Footer Component

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = Colors[colorScheme ?? 'light'].text;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeTintColor,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        {/* Main Tabs */}
       
        <Tabs.Screen
          name="connections"
          options={{
            title: 'Connections',
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen 
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({color}) => <TabBarIcon name="plus-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <TabBarIcon name="search-plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />

        {/* Login and Signup screens (hidden in the tab bar) */}
        <Tabs.Screen
          name="auth/login"
          options={{
            title: 'Login',
            tabBarStyle: { display: 'none' }, // Hide tab bar for login screen
            headerShown: false, // Hide header
          }}
        />
        <Tabs.Screen
          name="auth/signup"
          options={{
            title: 'Signup',
            tabBarStyle: { display: 'none' }, // Hide tab bar for signup screen
            headerShown: false, // Hide header
          }}
        />
      </Tabs>

   
    </>
  );
}
