import React from "react";
import { StyleSheet } from "react-native";
import { Text, TransparentView } from "../../../components/Themed";
import { ViewProps } from "../../../components/Themed";

interface MonsterTitleProps extends ViewProps {
  name: string;
  size: string;
  type: string;
  subtype?: string;
  alignment: string;
}
export const TitleSection: React.FC<MonsterTitleProps> = ({
  size,
  type,
  subtype,
  alignment,
  name
}) => {
  return (
    <TransparentView style={styles.section}>
      <Text style={styles.title}>{name}</Text>
      <Text>
        {size} | {type} | {subtype && subtype+' |'} {alignment}
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
      title: {
        fontSize: 28,
        fontWeight: "bold",
      },
})
