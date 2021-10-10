import React from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  TextProps,
  TransparentView,
} from "../../../../components/Themed";

interface NameAndDescTextProps extends TextProps {
  title: string;
  align?: "column" | "row";
  displayType?: "inline-block" | "flex";
}

export const NameAndDescText: React.FC<NameAndDescTextProps> = ({
  title,
  align,
  style,
  children,
}) => {
  let flexDirection = align ?? "row";
  return (
    <TransparentView style={[style, { flexWrap: "wrap", padding:2}, { flexDirection }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{children}</Text>
    </TransparentView>
  );
};

const styles = StyleSheet.create({
  title: {
    display: "flex",
    fontWeight: "700",
    fontSize: 16,
  },
  desc: {
    display: "flex",
    fontWeight: "300",
    fontSize: 14,
  },
});
