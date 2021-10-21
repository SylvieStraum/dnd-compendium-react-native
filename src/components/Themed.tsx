/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Text as DefaultText, View as DefaultView, ActivityIndicatorProps, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { useThemeColor } from '../hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SafeBackgroundProps = ThemeProps & SafeAreaViewProps
export type LoaderProps = ThemeProps & ActivityIndicatorProps

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundColor')
  
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TransparentView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  
  return <DefaultView style={[{ backgroundColor:'transparent' }, style]} {...otherProps} />;
}

export function CardView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card')
  
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeBackGround(props: SafeBackgroundProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  
  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedLoader(props: LoaderProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'border')
  
  return <ActivityIndicator color={color} style={[style]} {...otherProps} />;
}
