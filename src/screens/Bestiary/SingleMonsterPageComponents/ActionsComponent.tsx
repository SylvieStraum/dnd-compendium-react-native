import React from "react";
import { StyleSheet } from "react-native";
import { BaseMonsterAction } from "../../../types";
import { Text, TransparentView } from "../../../components/Themed";
import { NameAndDescText } from "./Text/NameAndDesc";
import { Divider } from "../../../components/Divider";

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
      <NameAndDescText key={item.name} title={item.name+': '} >
        {item.desc}
      </NameAndDescText>
    ));
  };
  return (
    <>
      {!!actions && (
        <>
          <TransparentView style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Actions</Text>
          </TransparentView>
          <TransparentView style={[styles.section]}>
            {displayActionType(actions)}
          </TransparentView>
        </>
      )}
      {!!reactions && (
        <>
          <TransparentView style={[styles.section]}>
            <Text style={styles.subSectionTitle}>Reactions</Text>
          </TransparentView>
          <TransparentView style={[styles.section]}>
            {displayActionType(reactions)}
          </TransparentView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});
