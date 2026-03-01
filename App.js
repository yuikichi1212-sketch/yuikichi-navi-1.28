import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'マップ') {
                            iconName = focused ? 'map' : 'map-outline';
                        } else if (route.name === 'お気に入り') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (route.name === '設定') {
                            iconName = focused ? 'settings' : 'settings-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#cfc900', // 濃いめの黄色
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderTopWidth: 1,
                        borderTopColor: '#eeeeee',
                        paddingBottom: 5,
                    },
                    headerStyle: { backgroundColor: '#ffffff' },
                    headerTintColor: '#333333',
                    headerTitleStyle: { fontWeight: 'bold' },
                })}
            >
                <Tab.Screen
                    name="マップ"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name="お気に入り"
                    component={FavoritesScreen}
                />
                <Tab.Screen
                    name="設定"
                    component={SettingsScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
