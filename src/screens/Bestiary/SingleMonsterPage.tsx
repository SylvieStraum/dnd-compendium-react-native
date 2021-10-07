import React, { useEffect, useCallback } from "react";
import { StyleSheet, FlatList, View, Text, Dimensions, Pressable } from "react-native";

import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { Monster } from "../../types/monsterTypes";
import { Screen } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";

const MONSTER_BY_NAME = gql`
  query GetMonster($name: String) {
    monster(filter: { name: $name }) {
      actions {
        attack_bonus
        damage {
          damage_dice
          damage_type {
            index
            name
            url
          }
        }
      }
      alignment
      armor_class
      challenge_rating
      charisma
      condition_immunities {
        index
        name
        url
      }
      constitution
      damage_immunities
      damage_resistances
      damage_vulnerabilities
      dexterity
      forms {
        index
        name
        url
      }
      hit_dice
      hit_points
      index
      intelligence
      languages
      legendary_actions {
        attack_bonus
        desc
        name
      }
      name
      proficiencies {
        proficiency {
          index
          name
          url
        }
        value
      }
      reactions {
        desc
        name
      }
      senses {
        blindsight
        darkvision
        passive_perception
        tremorsense
        truesight
      }
      size
      special_abilities {
        desc
        name
      }
      speed {
        burrow
        climb
        fly
        hover
        swim
        walk
      }
      strength
      subtype
      type
      url
      wisdom
      xp
    }
  }
`;

export const SingleMonsterPage: Screen<{ name: string }> = ({
  navigation,
  route: {
    params: { name },
  },
}) => {
  const screen = Dimensions.get("screen");
  const [findMonster, data] = useLazyQuery(MONSTER_BY_NAME);
  useEffect(() => {
    findMonster({
      variables: {
        name:name,
      },
    });
  }, [name]);

  console.log(data)
  return (
    <SafeAreaView style={[styles.container, { width: screen.width }]}>
      <Pressable onPress={()=>{
       navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Bestiary')
        }}>
        <Text>
          go back
        </Text>
      </Pressable>
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
});
