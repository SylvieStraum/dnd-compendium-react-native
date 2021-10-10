import React from "react";
import { Image, StyleSheet } from "react-native";
import { Navigation, Screen } from "../types";
import { SafeBackGround, Text } from "../components/Themed";
import { useTheme } from "../hooks/useTheme";
import { DraggableHomeItem } from "../components/DraggableHomeItem";
import { BestiaryImage, SpellOrb } from "../../assets/images";

export const HomePage: Screen<Navigation> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeBackGround style={[styles.container]}>
      <DraggableHomeItem
        theme={theme}
        onPress={() => {
          navigation.navigate("Bestiary");
        }}
      >
        <Image source={BestiaryImage} style={{tintColor:theme.colors.tint}}/>
        <Text>Bestiary</Text>
      </DraggableHomeItem>
      <DraggableHomeItem theme={theme} onPress={() => console.log('notyet')}>
        <Image source={SpellOrb} style={{tintColor:theme.colors.tint}}/>
        <Text>Spells</Text>
        <Text style={{fontSize:10}}>(TBD)</Text>
      </DraggableHomeItem>
    </SafeBackGround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
    flexDirection: "column",
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
