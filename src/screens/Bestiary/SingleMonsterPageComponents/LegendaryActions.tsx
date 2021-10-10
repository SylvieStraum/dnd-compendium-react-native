import React from "react";
import { StyleSheet } from "react-native";
import { BaseMonsterAction } from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";

interface LegendaryActionsProps {
  legendaryActions?: BaseMonsterAction[];
  legendaryDesc?: string;
}
export const LegendaryActions: React.FC<LegendaryActionsProps> = ({
  legendaryActions,
  legendaryDesc,
}) => {
  return (
    <>
      {!!legendaryActions ? (
        <>
          <TransparentView style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Legendary Actions</Text>
          </TransparentView>
          <Text>{legendaryDesc}</Text>
          <TransparentView style={[styles.section]}>
            {legendaryActions.map((item) => (
              <Text key={item.name} style={styles.textDesc}>
                <Text style={styles.textLabel}>{item.name}:</Text> {item.desc}
              </Text>
            ))}
          </TransparentView>
        </>
      ) : (
        <></>
      )}
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
