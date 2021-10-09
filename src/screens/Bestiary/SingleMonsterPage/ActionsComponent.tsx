import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MonsterActions, MonsterReactions } from "../../../types";

interface ActionsComponentProps {
  actions: MonsterActions[];
  reactions: MonsterReactions[];
}
export const ActionsComponent: React.FC<ActionsComponentProps> = ({
  actions,
  reactions,
}) => {
  const displayActionType = (arr: any[]) => {
    return arr.map((item) => (
      <Text key={item.name} style={styles.textDesc}>
        <Text style={styles.textLabel}>{item.name}:</Text> {item.desc}
      </Text>
    ));
  };
  return (
    <>
      {!!actions && (
        <>
          <View style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Actions</Text>
          </View>
          <View style={[styles.section]}>{displayActionType(actions)}</View>
        </>
      )}
      {
       !!reactions && <>
          <View style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Reactions</Text>
          </View>
          <View style={[styles.section]}>{displayActionType(reactions)}</View>
        </>
      }
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
    width:'80%',
    alignItems:'center',
    justifyContent:'center',
    borderBottomColor:'grey',
    borderBottomWidth:1
  },
});
