import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BestiaryPage } from "../screens/Bestiary/BestiaryPage";
import { BestiaryStackParamList } from "../types/nav";
import { SingleMonsterPage } from "../screens/Bestiary/SingleMonsterPage";

const Stack = createStackNavigator<BestiaryStackParamList>();

export const BestiaryStackNavigator: React.FC<unknown> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="BestiaryHomePage" component={BestiaryPage} />
      <Stack.Screen name="IndividualMonsterPage" component={SingleMonsterPage}/>
    </Stack.Navigator>
  );
};
