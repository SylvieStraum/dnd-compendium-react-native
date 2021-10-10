import React from "react";
import { StyleSheet} from "react-native";
import { Text, TransparentView } from "../../../components/Themed";
import { MonsterSpecial_abilities } from "../../../types";

interface SpecialAbilitiesComponentProps {
  rawSpecialAbilities?: MonsterSpecial_abilities[];
}
export const SpecialAbilitiesComponent: React.FC<SpecialAbilitiesComponentProps> =
  ({ rawSpecialAbilities }) => {
    return (<>
    { !!rawSpecialAbilities ? <><TransparentView style={[styles.section]}>
        {rawSpecialAbilities.map((item) => {
          return (
            <Text key={item.name} >
              <Text style={styles.textLabel}>{item.name}{item.name === 'Legendary Resistance' && ' (3/day)'}:</Text> {item.desc}
            </Text>
          );
        })}
      </TransparentView></>
      :
      <></>}
      </>
    );
  };

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
  textDesc: {
    padding: 6,
  },
  textLabel: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
