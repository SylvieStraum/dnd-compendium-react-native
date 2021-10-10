import React from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  TextProps,
  TransparentView,
} from "../../../../components/Themed";

interface SubSectionTitleProps extends TextProps {
  title: string;
}

export const SubSectionTitle: React.FC<SubSectionTitleProps> = ({
  title,
  style,
}) => {
  return (
    <TransparentView style={styles.section}>
      <Text style={styles.title}>{title}</Text>
    </TransparentView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
