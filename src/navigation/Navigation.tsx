import React, { useCallback } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { ProfileStackNavigator } from "./ProfileStackNavigator";
import { BestiaryStackNavigator } from "./BestiaryStackNavigator";
import { MainStackNavigator } from "./MainStackNavigator";
import { useTheme } from "../hooks/useTheme";

const RootStack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const routeNameRef = React.useRef<string>();
  const navigationRef = React.useRef<NavigationContainerRef<any> | null>(null);

  const handleNavigationStateChange = useCallback(() => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  }, []);

  return (
    <NavigationContainer
      ref={(instance) => (navigationRef.current = instance)}
      onReady={() =>
        (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name)
      }
      onStateChange={handleNavigationStateChange}
    >
      <RootStack.Navigator  screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Main" component={MainStackNavigator} />
        <RootStack.Screen name="Bestiary" component={BestiaryStackNavigator} />
        {/* <RootStack.Screen name="Profile" component={MainStackNavigator} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
