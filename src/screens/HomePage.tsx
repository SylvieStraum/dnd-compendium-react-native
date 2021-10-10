import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";

import { Navigation, Screen } from "../types";
import { useIsFocused } from "@react-navigation/core";
import { SafeBackGround, TransparentView } from "../components/Themed";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const BestiaryPage: Screen<Navigation> = ({ navigation }) => {
  const isFocused = useIsFocused();




  return (
    <SafeBackGround style={[styles.container]}>
        <TransparentView style={{flexDirection:'row', width:'100%'}}>
            
        </TransparentView>
   
    </SafeBackGround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection:'column'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
