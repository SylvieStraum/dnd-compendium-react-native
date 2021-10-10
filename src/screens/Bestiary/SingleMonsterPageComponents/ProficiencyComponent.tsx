import React from "react";
import { StyleSheet } from "react-native";
import { Text, TransparentView } from "../../../components/Themed";
import { NameAndDescText } from "./Text/NameAndDesc";

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
      {
        <NameAndDescText title="Saving Throws: ">
          <Text>
            {Object.entries(saves).map((item, index, arr) => {
              let num:any = item[1]
              let mathOp = num > 0 ? "+" : '';
              return `${item[0]} ${mathOp + item[1]}${ index === arr.length - 1 ? "." : ", "}`;
            })}
          </Text>
        </NameAndDescText>
      }
      {!!Object.entries(skills).length && (
        <NameAndDescText title="Skills: ">
          {Object.entries(skills).map((item, index, arr) => {
            let mathOp = !!item[1] ? "+" : "";
            return `${item[0]}: ${mathOp + item[1]}${
              index === arr.length - 1 ? "." : ", "
            }`;
          })}
        </NameAndDescText>
      )}
      {!!immunities && (
        <NameAndDescText title="Damage Immunities: ">
          {immunities}
        </NameAndDescText>
      )}
      {!!resistances && (
        <NameAndDescText title="Damage Resistances: ">
          {resistances}
        </NameAndDescText>
      )}
      {!!vulnerabilities && (
        <NameAndDescText title="Damage Vulnerabilities: ">
          {vulnerabilities}
        </NameAndDescText>
      )}
      {!!conditionImmunities && (
        <NameAndDescText title="Condition Immunities: ">
          {conditionImmunities}
        </NameAndDescText>
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
