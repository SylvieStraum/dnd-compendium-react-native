import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../hooks/useTheme";
import { ViewProps } from "../Themed";

interface TextDisplayIconProps extends ViewProps{
    iconType:string
    size:number
}
export const TextDisplayIcon = ({ iconType, style, size}: TextDisplayIconProps) => {
  const theme=useTheme()
  return (
      <Icon name={iconType} size={size} color={theme.colors.tint} style={style}/>
  );
};
