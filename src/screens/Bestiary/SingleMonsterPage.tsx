import React from "react";
import { StyleSheet, ScrollView, Image } from "react-native";
import {
  SafeBackGround,
  Text,
  TransparentView,
  View,
} from "../../components/Themed";

import { gql, useQuery } from "@apollo/client";
import { Monster, DjangoMonster } from "../../types/monsterTypes";
import { Navigation } from "../../types";
import { TitleSection } from "./SingleMonsterPageComponents/TitleSection";
import { StatsComponent } from "./SingleMonsterPageComponents/StatsComponent";
import { AbilityScoresComponent } from "./SingleMonsterPageComponents/AbilityScoresComponent";
import { ProficiencyComponent } from "./SingleMonsterPageComponents/ProficiencyComponent";
import { SpecialAbilitiesComponent } from "./SingleMonsterPageComponents/SpecialAbilitiesComponent";
import { ActionsComponent } from "./SingleMonsterPageComponents/ActionsComponent";
import { LegendaryActions } from "./SingleMonsterPageComponents/LegendaryActions";

interface SingleMonsterScreenProps {
  navigation: Navigation;
  route: { params: { name: string; monster: DjangoMonster } };
}

export const SingleMonsterPage: React.FC<SingleMonsterScreenProps> = ({
  navigation,
  route: {
    params: { monster },
  },
}) => {
  const abilityMod = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  return (
    <SafeBackGround style={[styles.container]}>
      <ScrollView
        overScrollMode="always"
        scrollToOverflowEnabled
        style={{ backgroundColor: "transparent", padding: 12 }}
      >
        <TransparentView style={{ paddingBottom: 40 }}>
          <TitleSection
            name={monster.name}
            size={monster.size}
            type={monster.type}
            subtype={monster.subtype}
            alignment={monster.alignment}
            source={monster.document__title}
            slug={monster.document__slug}
          />
          {monster.img_main && (
            <Image
              source={{ uri: monster.img_main }}
              style={{
                height: 300,
                width: "100%",
                resizeMode: "stretch",
                margin: 5,
              }}
            />
          )}
          <StatsComponent
            armorClass={monster.armor_class}
            armorType={monster.armor_desc}
            hitDice={monster.hit_dice}
            hitPoints={monster.hit_points}
            speed={monster.speed}
            senses={monster.senses}
            languages={monster.languages}
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
            skills={monster.skills}
            saves={{
              str: monster.strength_save ?? abilityMod(monster.strength),
              dex: monster.dexterity_save ?? abilityMod(monster.dexterity),
              con: monster.constitution_save ?? abilityMod(monster.constitution),
              int: monster.intelligence_save ?? abilityMod(monster.intelligence),
              wis: monster.wisdom_save ?? abilityMod(monster.wisdom),
              cha: monster.charisma_save ?? abilityMod(monster.charisma),
            }}
            immunities={monster.damage_immunities}
            resistances={monster.damage_resistances}
            vulnerabilities={monster.damage_vulnerabilities}
            conditionImmunities={monster.condition_immunities}
          />
          <SpecialAbilitiesComponent
            rawSpecialAbilities={monster.special_abilities}
          />
          <ActionsComponent
            actions={monster.actions}
            reactions={monster.reactions}
          />
          <LegendaryActions
            legendaryActions={monster.legendary_actions}
            legendaryDesc={monster.legendary_desc}
          />
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
