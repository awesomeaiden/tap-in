import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ScanScreen from "./src/screens/ScanScreen";
import ProjectScreen from "./src/screens/ProjectScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={HomeScreen} />
            <Stack.Screen name = "Scan" component={ScanScreen} />
            <Stack.Screen name = "Project" component={ProjectScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
