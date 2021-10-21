import React from "react";
import { BaseIconButton } from "./forms/BaseIconButton";
import { TextDisplayIcon } from "./forms/TextDisplayIcon";
import { Text, TransparentView, ViewProps } from "./Themed";

interface ButtonProps extends ViewProps {
  onPress?: () => void;
  iconType: string;
  sortLabel?: string;
  sortDirection?: 'asc'|'desc'
  size?:number
}
export const ModularIconButton: React.FC<ButtonProps> = ({
  onPress,
  style,
  iconType,
  sortLabel,
  sortDirection,
  size
}) => {
  const sortType = sortDirection==='asc' ? 'arrow-upward':'arrow-downward'
  const UnderButtonLabel= !!sortLabel ? <Text style={{margin:0,padding:0, marginTop:-10}}>{sortLabel} <TextDisplayIcon size={12} iconType={sortType}/></Text>:<></>
  return (
    <TransparentView
      style={[
        style,
        {
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          flexDirection:'column'
        },
      ]}
    >
        <BaseIconButton size={size} onPress={onPress} iconType={iconType ?? "clear"} />
        {UnderButtonLabel}
    </TransparentView>
  );
};
