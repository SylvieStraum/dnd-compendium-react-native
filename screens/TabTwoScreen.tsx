import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { gql, useQuery } from '@apollo/client'
import { RootStackScreenProps, RootTabScreenProps } from '../types/types';

const MONSTER_DATA = gql`
  query  GetMonsters {
    monsters {
      actions{
        attack_bonus
        damage{
          damage_dice
        damage_type{
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
      condition_immunities{
        index
        name
        url
      }
      constitution
      damage_immunities
      damage_resistances
      damage_vulnerabilities
      dexterity
      forms{
        index
        name
        url
      }
      hit_dice
      hit_points
      index
      intelligence
      languages
      legendary_actions{
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
`


export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {

  const monsterData = useQuery(MONSTER_DATA)
  useEffect(() => {
    console.log(monsterData)
  }, [monsterData])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
