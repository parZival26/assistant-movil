import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          height: 110, 
          paddingBottom: 40, 
          paddingTop: 5, 
          backgroundColor: '#2b5983'
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon
              icon={faCirclePlus}
              color={color}
              size={focused ? 26 : 22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="detalles"
        options={{
          title: 'Detalles',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon icon={faCalendar} color={color} size={focused ? 26 : 22} />
          ),
        }}
      />
    </Tabs>
  );
}