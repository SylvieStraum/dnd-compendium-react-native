import React from "react";
import { StyleSheet } from "react-native";
import { BaseMonsterAction } from "../../../types";
import { Text,  TransparentView } from "../../../components/Themed";


interface ActionsComponentProps {
  actions: BaseMonsterAction[];
  reactions: BaseMonsterAction[];
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
          < TransparentView style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Actions</Text>
          </ TransparentView>
          < TransparentView style={[styles.section]}>{displayActionType(actions)}</ TransparentView>
        </>
      )}
      {
       !!reactions && <>
          < TransparentView style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Reactions</Text>
          </ TransparentView>
          < TransparentView style={[styles.section]}>{displayActionType(reactions)}</ TransparentView>
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
