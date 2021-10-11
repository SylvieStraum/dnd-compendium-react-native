import React, { useCallback, useEffect, useState } from "react";
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
import { SafeBackGround } from "../../../components/Themed";
import { useTheme } from "../../../hooks/useTheme";
import { useModal } from "../../../hooks/useModal";
import { MyModal } from "../../../components/MyModal";
import { ListeItemAnimated } from "../../../components/ListItemAnimated";
import { BestiaryQueryHeader } from "./BestiaryQueryHeader";

interface DjangoCall {
  data: {
    next: string;
    previous: string;
    count: number;
    results: DjangoMonster[];
  };
}
const BASE_QUERY = "https://api.open5e.com/monsters/?limit=100";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const BestiaryPage: Screen<Navigation> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const modal = useModal();

  const [queryAddOn, setQueryAddOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [monstersArr, setMonstersArr] = useState<DjangoMonster[]>([]);

  const y = new Animated.Value(0);
  const [nextUrl, setNextUrl] = useState<string | undefined>();

  const djangoAsyncCall = async (useNewUrl: boolean, useQuery: boolean) => {
    setLoading(true);
    let queryToUse = BASE_QUERY;
    if (useNewUrl) {
      queryToUse = nextUrl ?? BASE_QUERY;
    }

    if (useQuery) {
      setMonstersArr([]);
      queryToUse = `https://api.open5e.com/monsters/?search=${queryAddOn}`;
    }
    const djangoMon: DjangoCall = await axios(queryToUse);
    setNextUrl(djangoMon.data.next);
    setMonstersArr((prev) =>
      prev.length
        ? [...prev, ...djangoMon.data.results]
        : djangoMon.data.results ?? []
    );
    setLoading(false);
  };
  useEffect(() => {
    !monstersArr.length && djangoAsyncCall(false, false);
  }, [isFocused]);

  useEffect(() => {}, [queryAddOn]);

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

  const _renderItem = ({ item, index }: { item: any; index: number }) => (
    <ListeItemAnimated
      key={item.name}
      y={y}
      index={index}
      onPress={() => {
        navigation.navigate("IndividualMonsterPage", {
          monster: item,
          name: item.name,
        });
      }}
    >
      <BestiaryListItem data={item} />
    </ListeItemAnimated>
  );

  return (
    <>
      <MyModal visible={modal.isVisible} setVisibility={modal.toggle} />
      <SafeBackGround style={[styles.container]}>
        <BestiaryQueryHeader
          goHome={() => navigation.navigate("Home")}
          query={queryAddOn}
          setQuery={setQueryAddOn}
          fireOffQuery={async () => await djangoAsyncCall(false, true)}
        />
        <AnimatedFlatList
          overScrollMode="always"
          scrollEventThrottle={16}
          style={{ width: "90%" }}
          indicatorStyle="white"
          bounces={false}
          data={monstersArr}
          extraData={monstersArr}
          scrollToOverflowEnabled
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={21}
          onEndReachedThreshold={3}
          onEndReached={async () => {
            await djangoAsyncCall(true, false);
          }}
          refreshing={loading}
          onRefresh={async () => {
            setMonstersArr([]);
            await djangoAsyncCall(false, false);
          }}
          renderItem={_renderItem}
          keyExtractor={(item: any) => {
            return item.name;
          }}
          {...{ onScroll }}
        />
      </SafeBackGround>
    </>
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
