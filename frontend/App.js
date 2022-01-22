import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={HomeScreen} />
            <Stack.Screen name = "Log In" component={LogInScreen} />
            <Stack.Screen name = "Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
