import React from "react";
import { StyleSheet } from "react-native";
import { Divider } from "../../../components/Divider";
import { Text, TransparentView } from "../../../components/Themed";
import { NameAndDescText } from "./Text/NameAndDesc";
interface AbilityScoresComponentProps {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  findMod: (num: number) => number;
}
export const AbilityScoresComponent: React.FC<AbilityScoresComponentProps> = ({
  str,
  dex,
  con,
  int,
  wis,
  cha,
  findMod,
}) => {
  const statArray = [
    { stat: "STR", val: str },
    { stat: "DEX", val: dex },
    { stat: "CON", val: con },
    { stat: "INT", val: int },
    { stat: "WIS", val: wis },
    { stat: "CHA", val: cha },
  ];

  return (<>
    <TransparentView
      style={[
        styles.section,
        { flexDirection: "row", justifyContent: "space-between", width:'90%', alignSelf:'center' },
      ]}
    >
      {statArray.map((item) => {
        const mod = findMod(item.val);
        return (<TransparentView style={{flexDirection:'column'}} key={item.stat}> 
            <NameAndDescText title={item.stat} align="column" style={{alignItems:'center'}}>
              {" "}
              {item.val}({mod>0 ? "+" + mod : mod})
            </NameAndDescText>
            </TransparentView>
        );
      })}
      
    </TransparentView>
    <Divider/>
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
});
