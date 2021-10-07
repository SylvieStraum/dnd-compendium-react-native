import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Dimensions,
  Pressable,
} from "react-native";

import { useQuery, gql } from "@apollo/client";
import { Monster } from "../../types/monsterTypes";
import { Navigation, Screen } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";

const MONSTER_DATA = gql`
  query GetAllMonsterData {
    monsters {
      challenge_rating
      forms {
        index
        name
        url
      }
      index
      name
      size
      speed {
        burrow
        climb
        fly
        hover
        swim
        walk
      }
      subtype
      type
      url
      xp
    }
  }
`;

export const BestiaryPage: Screen = ({
  navigation,
}: {
  navigation: Navigation;
}) => {
  const screen = Dimensions.get("screen");
  const monsterData = useQuery(MONSTER_DATA);

  if (!monsterData.data) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { width: screen.width }]}>
      <FlatList
        keyExtractor={(item) => item.url}
        data={monsterData.data.monsters}
        renderItem={({ item }: { item: Monster }) => {
          return (
            <Pressable
              style={[styles.listItemContainer, { width: "100%" }]}
              onPress={() =>
                navigation.navigate("IndividualMonsterPage", {
                  name: item.name,
                })
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
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
  listItemContainer: {
    marginVertical: 8,
    borderRadius: 10,
    minHeight: 80,
    width: "100%",
    backgroundColor: "#ff00ff",
  },
});
