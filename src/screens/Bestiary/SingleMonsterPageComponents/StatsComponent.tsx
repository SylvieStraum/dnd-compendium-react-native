import React from "react";
import { StyleSheet } from "react-native";
import { MonsterSpeed } from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";
import { NameAndDescText } from "./Text/NameAndDesc";
import { Divider } from "../../../components/Divider";

interface StatsComponentProps {
  armorClass: number;
  hitPoints: number;
  hitDice: string;
  armorType: string;
  speed: {};
  languages: string;
  senses: string;
}
export const StatsComponent: React.FC<StatsComponentProps> = ({
  armorClass,
  armorType,
  hitPoints,
  hitDice,
  speed,
  languages,
  senses,
}) => {
  return (<>
    <TransparentView style={styles.section}>
      <NameAndDescText title="Armor Class: ">
        {armorClass}
        {armorType && ` (${armorType})`}
      </NameAndDescText>
      <NameAndDescText title="Hit Points: ">
        {hitPoints} ({hitDice})
      </NameAndDescText>
      <NameAndDescText title="Speed: ">
        {Object.entries(speed).map((item, index, arr) => {
          if (item[1] === true) {
            return `${item[0]}, `;
          }
          return `${item[0] + " " + item[1]}${
            index === arr.length - 1 ? "." : ", "
          }`;
        })}
      </NameAndDescText>
      <NameAndDescText title="Languages: ">
      {languages ?? "none"}
      </NameAndDescText>
      <NameAndDescText title="Senses: ">
      {senses}
      </NameAndDescText>
      <Divider/>
    </TransparentView>
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
