import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Animated,
  Button,
  Dimensions,
} from "react-native";

import { gql, useLazyQuery, ApolloQueryResult, useQuery } from "@apollo/client";
import {
  SmallMonsterCall,
  SortFindManyMonsterInput,
} from "../../types/monsterTypes";
import { Navigation, Screen } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { BestiaryListItem } from "../../components/BestiaryListItem";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
import { CARD_HEIGHT } from "../../components/Card";

interface ApolloMonsters {
  monsters: SmallMonsterCall[];
}

const MONSTER_DATA = gql`
  query GetAllMonsterData($skip: Int, $sort: SortFindManyMonsterInput) {
    monsters(skip: $skip, sort: $sort, limit: 100) {
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
  const [monstersArr, setMonstersArr] = useState<SmallMonsterCall[]>([]);
  const [sortStyle, setSortStyle] =
    useState<SortFindManyMonsterInput>("NAME_ASC");
  const [isFetching, setIsFetching] = useState(false);
  const y = new Animated.Value(0);

  useFocusEffect(
    useCallback(() => {
      !monstersArr.length && fetchMonsters();
    }, [])
  );

  const [fetchMonsters, { data, fetchMore, loading, refetch }] = useLazyQuery(
    MONSTER_DATA,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "network-only",
      variables: {
        skip: monstersArr.length ?? 0,
        sort: sortStyle,
      },
    }
  );

  useEffect(() => {
    setMonstersArr((prev) => (prev.length ? prev : data?.monsters ?? []));
  }, [data]);

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <SafeAreaView style={[styles.container]}>
      <AnimatedFlatList
        overScrollMode="always"
        scrollEventThrottle={16}
        indicatorStyle="white"
        bounces={false}
        data={monstersArr}
        extraData={monstersArr}
        getItemLayout={(data: any, index: number) => ({
          length: CARD_HEIGHT + 32,
          offset: (CARD_HEIGHT + 32) * index,
          index,
        })}
        onEndReachedThreshold={0.5}
        onEndReached={async () => {
          setIsFetching(true);
          const result: ApolloQueryResult<ApolloMonsters> | undefined =
            await fetchMore?.({
              variables: { skip: monstersArr.length, sort: sortStyle },
            });
          !!result?.data.monsters.length &&
            setMonstersArr((prev) => {
              return [...prev, ...result.data.monsters];
            });
          setIsFetching(false);
        }}
        refreshing={isFetching}
        onRefresh={async () => {
          setIsFetching(true);
          const result: ApolloQueryResult<ApolloMonsters> | undefined =
            await refetch?.({
              skip: 0,
              sort: sortStyle,
            });
          !!result?.data.monsters.length &&
            setMonstersArr(() => {
              return result.data.monsters;
            });
          setIsFetching(false);
        }}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <BestiaryListItem
            y={y}
            index={index}
            data={item}
            onPress={() => {
              navigation.navigate("IndividualMonsterPage", {
                name: item.name,
              });
            }}
          />
        )}
        keyExtractor={(item: any) => {
          return item.index;
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
    height: "100%",
    backgroundColor: "#15131a",
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
