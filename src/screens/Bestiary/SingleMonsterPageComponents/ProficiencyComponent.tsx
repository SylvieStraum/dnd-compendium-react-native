import React from "react";
import { StyleSheet } from "react-native";
import {
  MonsterCondition_immunities,
  MonsterProficiencies,
} from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";

interface ProficiencyComponentProps {
  skills: {};
  saves: {};
  immunities: string;
  resistances: string;
  vulnerabilities: string;
  conditionImmunities: string;
}
export const ProficiencyComponent: React.FC<ProficiencyComponentProps> = ({
  skills,
  saves,
  immunities,
  resistances,
  vulnerabilities,
  conditionImmunities,
}) => {
  return (
    <TransparentView style={[styles.section]}>
      {!!saves && (
        <Text>
          <Text style={styles.textLabel}>Saving throws:</Text>{" "}
          {Object.entries(saves).map((item, index, arr) => {
            if (item[1] === null) {
              return;
            }
            let mathOp = !!item[1] ? "+" : "";
            return `${item[0]}: ${mathOp + item[1]}${" "}`;
          })}
        </Text>
      )}
      {skills && (
        <Text>
          <Text style={styles.textLabel}>Skills:</Text>{" "}
          {Object.entries(skills).map((item, index, arr) => {
            let mathOp = !!item[1] ? "+" : "";
            return `${item[0]}: ${mathOp+item[1]}${
              index === arr.length - 1 ? "." : ", "
            }`;
          })}
        </Text>
      )}
      {!!immunities && <Text><Text style={styles.textLabel}>Damage Immunities:</Text> {immunities}</Text>}
      {!!resistances && <Text><Text style={styles.textLabel}>Damage Resistances:</Text> {resistances}</Text>}
      {!!vulnerabilities && (
        <Text><Text style={styles.textLabel}>Damage Vulnerabilities:</Text> {vulnerabilities}</Text>
      )}
      {!!conditionImmunities && (
        <Text><Text style={styles.textLabel}>Condition Immunities:</Text> {conditionImmunities}</Text>
      )}
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
