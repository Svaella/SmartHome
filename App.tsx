import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ReportsScreen from './screens/ReportsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap; // Restricción del tipo
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Camera') {
                            iconName = focused ? 'camera' : 'camera-outline';
                        } else if (route.name === 'Reports') {
                            iconName = focused ? 'list' : 'list-outline';
                        } else {
                            iconName = 'help'; // Ícono predeterminado
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#87CEEB',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Camera" component={CameraScreen} />
                <Tab.Screen name="Reports" component={ReportsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
66}