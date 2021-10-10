import React from "react";
import { StyleSheet } from "react-native";
import { Divider } from "../../../components/Divider";
import { Text, TransparentView } from "../../../components/Themed";
import { ViewProps } from "../../../components/Themed";

interface MonsterTitleProps extends ViewProps {
  name: string;
  size: string;
  type: string;
  subtype?: string;
  alignment: string;
  source: string
  slug:string
}
export const TitleSection: React.FC<MonsterTitleProps> = ({
  size,
  type,
  subtype,
  alignment,
  name,
  source,
  slug
}) => {
  return (
    <TransparentView style={styles.section}>
      <Text style={styles.title}>{name}</Text>
      <Text>
        {size} | {type} | {subtype && subtype + " |"} {alignment}
      </Text>
      <Text>{source} ({slug})</Text>
      <Divider/>
    </TransparentView>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
