import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadScreen from "./src/screens/LoadScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileScreen from './src/screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
    AsyncStorage.clear();
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Load" component={LoadScreen} />
            <Stack.Screen name = "Home" component={HomeScreen} />
            <Stack.Screen name = "Log In" component={LogInScreen} />
            <Stack.Screen name = "Sign Up" component={SignUpScreen} />
            <Stack.Screen name = "Profile" component={ProfileScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
