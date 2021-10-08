import React from "react";
import { Platform, View } from "react-native";
import { BaseIconButton } from "./forms/BaseIconButton";

export const BackButton = ({
  onPress,
  render,
}: {
  onPress?: () => void;
  render: boolean;
}) => {
  const iconType = Platform.OS === "ios" ? "arrow-back-ios" : "arrow-back";
  return (
    <View
      style={{
        width: "33%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor:'transparent'
      }}
    >
    { render&&  <BaseIconButton onPress={onPress} iconType={iconType} />}
    </View>
  );
};
