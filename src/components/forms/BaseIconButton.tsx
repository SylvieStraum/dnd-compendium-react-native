import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../hooks/useTheme";

export const BaseIconButton = ({ onPress, iconType, size }: { onPress?: () => void, iconType:string, size?:number }) => {
  const theme=useTheme()
  return (
      <Icon.Button name={iconType} size={size ?? 30} color={theme.colors.tint} backgroundColor="transparent"  onPress={onPress} />
  );
};
