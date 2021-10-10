import React from "react";
import {
  StyleSheet,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { TransparentView, ViewProps } from "./Themed";

const styles = StyleSheet.create({
divider:{
    width:'90%',
    margin:0,
    paddingHorizontal:6,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderBottomWidth:1,
    alignSelf:'center'
}
});

interface DividerProps extends ViewProps {}

export const Divider = ({ style }: DividerProps) => {
    const theme = useTheme()
  return <TransparentView style={[styles.divider, style, { borderBottomColor:theme.colors.border}]}/>
};
