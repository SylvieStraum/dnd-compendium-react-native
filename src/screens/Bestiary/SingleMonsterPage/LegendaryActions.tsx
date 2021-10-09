import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MonsterLegendary_actions } from "../../../types";

interface LegendaryActionsProps {
  rawLegendaryActions?: MonsterLegendary_actions[];
}
export const LegendaryActions: React.FC<LegendaryActionsProps> = ({
  rawLegendaryActions,
}) => {
  const LegendaryActions = rawLegendaryActions?.map((item) => {
    return (
      <Text key={item.name} style={styles.textDesc}>
        <Text style={styles.textLabel}>{item.name}:</Text> {item.desc}
      </Text>
    );
  });
  return (
    <>
      {!!rawLegendaryActions ? (
        <>
          <View style={[styles.section]}>
            <Text style={styles.title}>Legendary Actions</Text>
          </View>
          <View style={[styles.section]}>{LegendaryActions}</View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
