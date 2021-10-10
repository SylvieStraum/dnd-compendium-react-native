import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeBackGround, Text, TransparentView, View } from "../../components/Themed";

import { gql, useQuery } from "@apollo/client";
import { Monster } from "../../types/monsterTypes";
import { Navigation, Screen } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TitleSection } from "./SingleMonsterPageComponents/TitleSection";
import { StatsComponent } from "./SingleMonsterPageComponents/StatsComponent";
import { AbilityScoresComponent } from "./SingleMonsterPageComponents/AbilityScoresComponent";
import { ProficiencyComponent } from "./SingleMonsterPageComponents/ProficiencyComponent";
import { SpecialAbilitiesComponent } from "./SingleMonsterPageComponents/SpecialAbilitiesComponent";
import { ActionsComponent } from "./SingleMonsterPageComponents/ActionsComponent";
import { LegendaryActions } from "./SingleMonsterPageComponents/LegendaryActions";

const MONSTER_BY_NAME = gql`
  query GetMonster($name: String!) {
    monster(filter: { name: $name }) {
      actions {
        name
        desc
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
interface ApolloMonster {
  monster: Monster;
}
interface SingleMonsterScreenProps {
  navigation: Navigation;
  route: { params: { name: string } };
}

export const SingleMonsterPage: React.FC<SingleMonsterScreenProps> = ({
  navigation,
  route: {
    params: { name },
  },
}) => {
  const findMonster = useQuery<ApolloMonster>(MONSTER_BY_NAME, {
    variables: {
      name: name,
    },
    fetchPolicy: "cache-and-network",
  });

  const monster = findMonster.data?.monster;

  if (findMonster.loading || !monster?.actions) {
    return null;
  }

  const abilityMod = (score: number) => {
    return Math.floor((score - 10) / 2);
  };
  if(!monster){
    return <SafeBackGround>
      
    </SafeBackGround>
  }

  return (
    <SafeBackGround style={[styles.container]}>
      <ScrollView 
      overScrollMode='always'
      scrollToOverflowEnabled
      style={{ backgroundColor: "transparent", padding:12, }}>
        <TransparentView style={{paddingBottom:40}}>
        <TitleSection
          name={monster.name}
          size={monster.size}
          type={monster.type}
          subtype={monster.subtype}
          alignment={monster.alignment}
        />
        <StatsComponent
          armorClass={monster.armor_class}
          hitDice={monster.hit_dice}
          hitPoints={monster.hit_points}
          findMod={abilityMod}
          con={monster.constitution}
          speed={monster.speed}
        />
        <AbilityScoresComponent
          str={monster.strength}
          dex={monster.dexterity}
          con={monster.constitution}
          int={monster.intelligence}
          wis={monster.wisdom}
          cha={monster.charisma}
          findMod={abilityMod}
        />
        <ProficiencyComponent
          proficiencies={monster.proficiencies}
          rawImmune={monster.damage_immunities}
          rawResist={monster.damage_resistances}
          rawVuln={monster.damage_vulnerabilities}
          rawConditions={monster.condition_immunities}
        />
        <SpecialAbilitiesComponent
          rawSpecialAbilities={monster.special_abilities}
        />
        <ActionsComponent
          actions={monster.actions}
          reactions={monster.reactions}
        />
        <LegendaryActions rawLegendaryActions={monster.legendary_actions} />
        </TransparentView>
      </ScrollView>
    </SafeBackGround>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  section: {
    paddingVertical: 8,
  },
  textDesc: {
    padding: 6,
  },
  textLabel: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
