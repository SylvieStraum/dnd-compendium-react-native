import React from "react";
import { StyleSheet } from "react-native";
import {
  MonsterCondition_immunities,
  MonsterProficiencies,
} from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";

interface ProficiencyComponentProps {
  proficiencies: MonsterProficiencies[];
  rawImmune: string[];
  rawResist: string[];
  rawVuln: string[];
  rawConditions: MonsterCondition_immunities[];
}
export const ProficiencyComponent: React.FC<ProficiencyComponentProps> = ({
  proficiencies,
  rawImmune,
  rawResist,
  rawVuln,
  rawConditions,
}) => {
  const profArray = proficiencies.map((item) => {
    if (item.proficiency.name.toLowerCase().includes("saving")) {
      return {
        saving: `${item.proficiency.name.split(": ")[1]} +${item.value}`,
      };
    } else {
      return {
        skill: `${item.proficiency.name.split(": ")[1]} +${item.value}`,
      };
    }
  });
  const readableStringMap = (arr: any[]) => {
    return arr.map((item, index) => {
      return `${item?.name ?? item}${arr.length > 2 ? ", " : ""}`;
    });
  };
  const immunities = readableStringMap(rawImmune);
  const resistances = readableStringMap(rawResist);
  const vulnerabilites = readableStringMap(rawVuln);
  const conditions = readableStringMap(rawConditions);
  return (
    <TransparentView style={[styles.section]}>
      <Text>
        Saving throws:{" "}
        {profArray.map((item) => item.saving && `${item.saving}, `)}
      </Text>
      <Text>
        Skills: {profArray.map((item) => item.skill && `${item.skill}, `)}
      </Text>
      {!!immunities.length && <Text>Damage Immunities: {immunities}</Text>}
      {!!resistances.length && <Text>Damage Resistances: {resistances}</Text>}
      {!!vulnerabilites.length && (
        <Text>Damage Vulnerabilities: {vulnerabilites}</Text>
      )}
      {!!conditions.length && <Text>Condition Immunities: {conditions}</Text>}
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
