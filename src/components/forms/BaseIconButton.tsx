import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "../../constants/Colors";

export const BaseIconButton = ({ onPress, iconType }: { onPress?: () => void, iconType:string }) => {
  return (
      <Icon.Button name={iconType} size={30} color={Colors.dark.text} backgroundColor="transparent"  onPress={onPress} />
  );
};
