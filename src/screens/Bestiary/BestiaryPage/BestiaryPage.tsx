import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, FlatList, Animated } from "react-native";
import axios from "axios";

import {
  SortFindManyMonsterInput,
  DjangoMonster,
} from "../../../types/monsterTypes";
import { Navigation, Screen } from "../../../types";
import { BestiaryListItem } from "./BestiaryListItem";
import { useIsFocused } from "@react-navigation/core";
import { CARD_HEIGHT } from "../../../components/Card";
import { SafeBackGround, TransparentView } from "../../../components/Themed";
import { useTheme } from "../../../hooks/useTheme";

interface DjangoCall {
  data: {
    next: string;
    previous: string;
    count: number;
    results: DjangoMonster[];
  };
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const BestiaryPage: Screen<Navigation> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [monstersArr, setMonstersArr] = useState<DjangoMonster[]>([]);

  const [sortStyle, setSortStyle] =
    useState<SortFindManyMonsterInput>("NAME_ASC");
  const y = new Animated.Value(0);
  const [nextUrl, setNextUrl] = useState<string | undefined>();

  const djangoAsyncCall = async (newUrl?: string) => {
    setLoading(true);
    const djangoMon: DjangoCall = await axios(
      newUrl ?? "https://api.open5e.com/monsters/?limit=100"
    );
    setNextUrl(djangoMon.data.next);
    setMonstersArr((prev) =>
      prev.length
        ? [...prev, ...djangoMon.data.results]
        : djangoMon.data.results ?? []
    );
    setLoading(false);
  };
  useEffect(() => {
    !monstersArr.length && djangoAsyncCall();
  }, [isFocused]);

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: CARD_HEIGHT + 32,
      offset: (CARD_HEIGHT + 32) * index,
      index,
    }),
    []
  );
  const seperatorElement = () => (
    <TransparentView
      style={[
        {
          borderBottomColor: theme.colors.border,
        },
        styles.separator,
      ]}
    />
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
        ItemSeparatorComponent={seperatorElement}
        onEndReached={async () => {
          await djangoAsyncCall(nextUrl);
        }}
        refreshing={loading}
        onRefresh={async () => {
          setMonstersArr([]);
          await djangoAsyncCall();
        }}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <BestiaryListItem
            key={item.name}
            y={y}
            index={index}
            data={item}
            onPress={() => {
              navigation.navigate("IndividualMonsterPage", {
                monster: item,
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
    marginVertical: 0,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
