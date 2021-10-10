import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { DjangoMonster } from ".";

export type RootStackParamList = {
  Main: undefined;
  Bestiary: undefined;
  Profile: undefined;
  NotFound: undefined;
};

export type MainStackParamList = {
  Home: undefined;
};

export type ProfileStackParamList = {
  Settings: undefined;
};

export type BestiaryStackParamList = {
  BestiaryHome: undefined;
  IndividualMonsterPage: { monster: DjangoMonster; name: string };
  FilterPage: undefined;
};

export type OverallStackParamList = RootStackParamList &
  MainStackParamList &
  ProfileStackParamList &
  BestiaryStackParamList;

export type Navigation = StackNavigationProp<OverallStackParamList>;

export type Screen<Params = Record<string, unknown>> = React.FC<
  { navigation: Navigation } & { route: { params: Params } }
>;
