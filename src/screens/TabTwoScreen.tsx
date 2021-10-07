import React, { useEffect, useCallback } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'

import { useQuery, gql } from '@apollo/client'
import { RootTabScreenProps } from '../types/types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Monster } from '../types/monsterTypes'

const MONSTER_DATA = gql`
  query GetAllMonsterData {
    monsters {
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
`

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const monsterData = useQuery(MONSTER_DATA)

 
  return (
    <View style={styles.container}>
      <FlatList 
      data={monsterData.data}
      renderItem={({item}:{item:Monster}) => {
        console.log(item)
        return(
        <View style={styles.listItemContainer}>
          <Text>{item.name}</Text>
        </View>
      )}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
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
  listItemContainer: {
    marginVertical: 8,
    padding: 6,
    paddingRight: 14,
    borderRadius: 10,
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'red'
  },
})
