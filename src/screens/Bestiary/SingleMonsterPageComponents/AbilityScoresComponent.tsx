import React from "react";
import { StyleSheet } from "react-native";
import { Text,  TransparentView } from "../../../components/Themed";
interface AbilityScoresComponentProps {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  findMod: (num: number) => number;
}
export const AbilityScoresComponent: React.FC<AbilityScoresComponentProps> = ({
  str,
  dex,
  con,
  int,
  wis,
  cha,
  findMod,
}) => {
  const statArray = [
    { stat: "STR", val: str },
    { stat: "DEX", val: dex },
    { stat: "CON", val: con },
    { stat: "INT", val: int },
    { stat: "WIS", val: wis },
    { stat: "CHA", val: cha },
  ];

  return (
    < TransparentView
      style={[
        styles.section,
        { flexDirection: "row", justifyContent: "space-between" },
      ]}
    >
      {statArray.map((item) => {
        const mod = findMod(item.val);
        return (
          < TransparentView
            key={item.stat}
            style={{ flexDirection: "column", alignItems: "center" }}
          >
            <Text style={styles.textLabel}>{item.stat}</Text>
            <Text>
              {item.val}(+{mod})
            </Text>
          </ TransparentView>
        );
      })}
    </ TransparentView>
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
});
