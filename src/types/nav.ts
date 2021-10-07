import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Main: undefined;
  Bestiary: undefined;
  Profile: undefined;
  NotFound: undefined;
};

export type MainStackParamList = {
  Launch:undefined;
  Home:undefined;
}

export type ProfileStackParamList = {
Settings:undefined;
};

export type BestiaryStackParamList = {
  BestiaryHomePage: undefined;
  IndividualMonsterPage: { name: string };
  filterPage: undefined;
};

export type OverallStackParamList = RootStackParamList &
  ProfileStackParamList &
  BestiaryStackParamList;

export type Navigation = StackNavigationProp<OverallStackParamList>;

export type Screen<Params = Record<string, unknown>> = React.FC<
  { navigation: Navigation } & { route: { params: Params } }
>;
