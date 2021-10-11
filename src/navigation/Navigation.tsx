import React, { useCallback } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { BestiaryStackNavigator } from "./BestiaryStackNavigator";
import { MainStackNavigator } from "./MainStackNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const theme = useTheme();
  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationContainerRef<any> | null>(null);

  const handleNavigationStateChange = useCallback(() => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  }, []);

  const myDarkTheme = {
    dark: true,
    colors: {
      primary: "#FBFAF5",
      card: "#2f2b3b",
      border: "#f23269",
      notification: "",
      text: "#e9e8ea",
      background: "#161414",
      backgroundColor: "#232121",
    },
  };

  return (
    <NavigationContainer
    theme={myDarkTheme}
      ref={(instance) => (navigationRef.current = instance)}
      onReady={() =>
        (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name)
      }
      onStateChange={handleNavigationStateChange}
    >
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Main" component={MainStackNavigator} />
        <RootStack.Screen name="Bestiary" component={BestiaryStackNavigator} />
        {/* <RootStack.Screen name="Profile" component={MainStackNavigator} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
