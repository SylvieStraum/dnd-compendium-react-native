import React from "react";
import { StyleSheet } from "react-native";
import { BaseMonsterAction } from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";
import { NameAndDescText } from "./Text/NameAndDesc";
import { SubSectionTitle } from "./Text/SubSectionTitle";

interface LegendaryActionsProps {
  legendaryActions?: BaseMonsterAction[];
  legendaryDesc?: string;
}
export const LegendaryActions: React.FC<LegendaryActionsProps> = ({
  legendaryActions,
  legendaryDesc,
}) => {
  return (
    <>
      {!!legendaryActions ? (
        <>
         <SubSectionTitle title="Legendary Actions"/>
          <Text>{legendaryDesc}</Text>
          <TransparentView style={[styles.section]}>
            {legendaryActions.map((item) => (
                 <NameAndDescText key={item.name} title={item.name+': '} align="row">
                 {item.desc}
               </NameAndDescText>
            ))}
          </TransparentView>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
});
