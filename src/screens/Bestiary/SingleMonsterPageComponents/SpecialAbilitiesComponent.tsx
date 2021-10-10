import React from "react";
import { StyleSheet} from "react-native";
import { Text, TransparentView } from "../../../components/Themed";
import { MonsterSpecial_abilities } from "../../../types";

interface AbilityType {
  name:string
  desc:string
}
interface SpecialAbilitiesComponentProps {
  rawSpecialAbilities?: AbilityType[];
}
export const SpecialAbilitiesComponent: React.FC<SpecialAbilitiesComponentProps> =
  ({ rawSpecialAbilities }) => {
    return (<>
    { !!rawSpecialAbilities ? <>
    <TransparentView style={[styles.section,]}>
      <Text style={styles.subSectionTitle}>Abilities:</Text>
      <TransparentView style={styles.divider}/>
        {rawSpecialAbilities.map((item) => {
          return (
            <Text key={item.name} style={styles.textDesc}>
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
    paddingVertical: 6,
    paddingHorizontal:3
  },
  textLabel: {
    fontWeight: "bold",
  },
  divider:{
    width:'90%',
    alignSelf:'center',
    justifyContent:'center',
    borderBottomColor:'grey',
    borderBottomWidth:1
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
