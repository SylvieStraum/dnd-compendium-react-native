import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Animated,
  Button,
  Dimensions,
} from "react-native";

import { gql, useLazyQuery, ApolloQueryResult, useQuery } from "@apollo/client";
import { SmallMonsterCall, SortFindManyMonsterInput } from "../../types/monsterTypes";
import { Navigation, Screen } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { BestiaryListItem } from "../../components/BestiaryListItem";
import { useIsFocused } from "@react-navigation/core";
import { CARD_HEIGHT } from "../../components/Card";

interface ApolloMonsters {
  monsters: SmallMonsterCall[];
}

const MONSTER_DATA = gql`
  query GetAllMonsterData($skip: Int, $sort:SortFindManyMonsterInput) {
    monsters(skip: $skip, sort:$sort) {
      challenge_rating
      index
      name
      size
      subtype
      type
      url
      xp
    }
  }
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const BestiaryPage: Screen<Navigation> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [monstersArr, setMonstersArr] = useState<SmallMonsterCall[]>([]);
  const [sortStyle, setSortStyle] = useState<SortFindManyMonsterInput>('NAME_ASC')

  const [fetchMonsters, monsterResult] = useLazyQuery(MONSTER_DATA, {
    fetchPolicy: "no-cache",
    variables: {
      skip: monstersArr.length ?? 0,
      sort:sortStyle
    },
  });

  useEffect(() => {
    !monstersArr.length && fetchMonsters({ variables: { skip: 0, sort:sortStyle } });
  }, [isFocused]);

  useEffect(() => {
    setMonstersArr((prev) =>
      prev.length ? prev : monsterResult.data?.monsters ?? []
    );
  }, [monsterResult.data]);

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  return (
    <SafeAreaView style={[styles.container]}>
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={monstersArr}
        extraData={monstersArr}
        onEndReachedThreshold={0.2}
        onEndReached={async () => {
          if (!monsterResult.called) {
            return
          }
          const result: ApolloQueryResult<ApolloMonsters> = await monsterResult.fetchMore(
            {
              variables:{skip:monstersArr.length, sort:sortStyle}
            },
          )
          setMonstersArr(prev => {
            return [...prev, ...result.data.monsters]
          })
        }}
        refreshing={monsterResult.loading}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <BestiaryListItem
            y={y}
            index={index}
            data={item}
            onPress={() =>
              navigation.navigate("IndividualMonsterPage", {
                name: item.name,
              })
            }
          />
        )}
        keyExtractor={(item: any) => {
          return item.url;
        }}
        {...{ onScroll }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
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
