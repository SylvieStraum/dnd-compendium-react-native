import React from "react";
import { BaseIconButton } from "./forms/BaseIconButton";
import { TransparentView } from "./Themed";


export const HomeButton = ({ onPress }: { onPress?: () => void }) => {
  const iconType = "home";
  return (
    <TransparentView
      style={{
        width: "33%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
      }}
    >
      {<BaseIconButton onPress={onPress} iconType={iconType}/>}
    </TransparentView>
  );
};
