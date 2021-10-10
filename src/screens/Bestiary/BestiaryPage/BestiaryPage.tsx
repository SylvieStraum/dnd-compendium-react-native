import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Animated,
} from "react-native";

import { gql, useLazyQuery, ApolloQueryResult, useQuery } from "@apollo/client";
import {
  SmallMonsterCall,
  SortFindManyMonsterInput,
} from "../../../types/monsterTypes";
import { Navigation, Screen } from "../../../types";
import { BestiaryListItem } from "./BestiaryListItem";
import { useIsFocused } from "@react-navigation/core";
import { CARD_HEIGHT } from "../../../components/Card";
import { SafeBackGround } from "../../../components/Themed";

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
  const isFocused = useIsFocused();
  const [monstersArr, setMonstersArr] = useState<SmallMonsterCall[]>([]);
  const [sortStyle, setSortStyle] =
    useState<SortFindManyMonsterInput>("NAME_ASC");
  const y = new Animated.Value(0);

  useEffect(() => {
    fetchMonsters();
  }, [isFocused]);

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

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: CARD_HEIGHT + 0,
      offset: (CARD_HEIGHT + 0) * index,
      index,
    }),
    []
  );

  return (
    <SafeBackGround style={[styles.container]}>
      <AnimatedFlatList
        overScrollMode="always"
        scrollEventThrottle={16}
        indicatorStyle="white"
        bounces={false}
        data={monstersArr}
        extraData={monstersArr}
        scrollToOverflowEnabled
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={21}
        onEndReachedThreshold={3}
        onEndReached={async () => {
          const result: ApolloQueryResult<ApolloMonsters> = await fetchMore!({
            variables: { skip: monstersArr.length, sort: sortStyle },
          });
          !!result?.data.monsters.length &&
            setMonstersArr((prev) => {
              return [...prev, ...result.data.monsters];
            });
        }}
        refreshing={loading}
        onRefresh={async () => {
          const result: ApolloQueryResult<ApolloMonsters> | undefined =
            await refetch?.({
              skip: 0,
              sort: sortStyle,
            });
          !!result?.data.monsters.length &&
            setMonstersArr(() => {
              return result.data.monsters;
            });
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
    </SafeBackGround>
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
