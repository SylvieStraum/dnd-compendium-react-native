import React from "react";
import { StyleSheet } from "react-native";
import { Text, TransparentView } from "../../../components/Themed";
import { MonsterSpecial_abilities } from "../../../types";
import { NameAndDescText } from "./Text/NameAndDesc";
import { SubSectionTitle } from "./Text/SubSectionTitle";

interface AbilityType {
  name: string;
  desc: string;
}
interface SpecialAbilitiesComponentProps {
  rawSpecialAbilities?: AbilityType[];
}
export const SpecialAbilitiesComponent: React.FC<SpecialAbilitiesComponentProps> =
  ({ rawSpecialAbilities }) => {
    return (
      <>
        {!!rawSpecialAbilities ? (
          <>
            <SubSectionTitle title="Abilities" />
            <TransparentView style={[styles.section]}>
              {rawSpecialAbilities.map((item) => {
                return (
                  <NameAndDescText key={item.name+": "} title={item.name}>
                    {item.desc}
                  </NameAndDescText>
                );
              })}
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
