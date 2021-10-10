import React from "react";
import { StyleSheet } from "react-native";
import { MonsterSpeed } from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";

interface StatsComponentProps {
  armorClass: number;
  hitPoints: number;
  hitDice: string;
  armorType:string;
  speed: {};
}
export const StatsComponent: React.FC<StatsComponentProps> = ({
  armorClass,
  armorType,
  hitPoints,
  hitDice,
  speed,
}) => {
  return (
    <TransparentView style={styles.section}>
      <Text><Text style={styles.textLabel}>Armor Class:</Text> {armorClass}{armorType&&` (${armorType})`}</Text>
      <Text>
      <Text style={styles.textLabel}>Hit Points:</Text> {hitPoints} ({hitDice})
      </Text>
      <Text>
      <Text style={styles.textLabel}>Speed:</Text>{" "}
        {Object.entries(speed).map((item, index, arr) => {
          if (item[1]===true) {
            return `${item[0]}, `;
          }
          return `${item[0] + " " + item[1]}${index===arr.length-1 ? '.':', '}`;
        })}
      </Text>
    </TransparentView>
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
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
