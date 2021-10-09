import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MonsterSpeed } from "../../../types";

interface StatsComponentProps {
  armorClass: number;
  hitPoints: number;
  hitDice: string;
  speed: MonsterSpeed;
  con: number;
  findMod: (num: number) => number;
}
export const StatsComponent: React.FC<StatsComponentProps> = ({
  armorClass,
  hitPoints,
  hitDice,
  speed,
  con,
  findMod,
}) => {
  return (
    <View style={styles.section}>
      <Text>Armor Class: {armorClass}</Text>
      <Text>
        Hit Points: {hitPoints} ({hitDice} +{" "}
        {parseInt(hitDice.split("d")[0]) * findMod(con)})
      </Text>
      <Text>
        Speed:{" "}
        {Object.entries(speed).map((item) => {
          if (item[1] && item[1] !== "MonsterSpeed") {
            return `${item[0] + " " + item[1]}`;
          }
        })}
      </Text>
    </View>
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
