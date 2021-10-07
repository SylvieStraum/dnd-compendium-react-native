import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/TabOneScreen";
import { MainStackParamList } from "../types/nav";

const Stack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC<Record<string,unknown>> = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
  )
};
