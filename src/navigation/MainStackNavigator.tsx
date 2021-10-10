import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "../types/nav";
import { HomePage } from "../screens/HomePage";

const Stack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC<unknown> = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
};
