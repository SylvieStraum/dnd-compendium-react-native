import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/TabOneScreen'
import { ProfileStackParamList } from '../types/nav';


const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator: React.FC<{}> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen  name="Settings" component={HomeScreen}/>
    </Stack.Navigator>
  );
};
