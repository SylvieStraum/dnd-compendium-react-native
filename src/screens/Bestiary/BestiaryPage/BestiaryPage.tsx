import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, Animated, RefreshControl } from "react-native";
import axios from "axios";
import { DjangoMonster } from "../../../types/monsterTypes";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import { Navigation, Screen } from "../../../types";
import { BestiaryListItem } from "./BestiaryListItem";
import { CARD_HEIGHT } from "../../../components/Card";
import { SafeBackGround, Text, ThemedLoader } from "../../../components/Themed";
import { useModal } from "../../../hooks/useModal";
import { MyFilterModal, SortObj } from "../../../components/MyFilterModal";
import { ListeItemAnimated } from "../../../components/ListItemAnimated";
import { BestiaryQueryHeader } from "./BestiaryQueryHeader";
import { useTheme } from "../../../hooks/useTheme";

interface DjangoCall {
  next: string;
  previous: string;
  count: number;
  results: DjangoMonster[];
}

const BASE_QUERY = "https://api.open5e.com/monsters";
const LIMIT="&limit=100"
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const MONSTER_FILTERS: SortObj[] = [
  { value: "name", sort: "asc", label: "name asc" },
  { value: "-name", sort: "desc", label: "name desc" },
  // { value: "challenge_rating", sort: "asc", label: "CR asc" },
  // { value: "-challenge_rating", sort: "desc", label: "CR desc" },
  { value: "type", sort: "asc", label: "type asc" },
  { value: "-type", sort: "desc", label: "type desc" },
  { value: "size", sort: "asc", label: "size asc" },
  { value: "-size", sort: "desc", label: "size desc" },
];

export const BestiaryPage: Screen<Navigation> = ({ navigation }) => {
  const modal = useModal();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [footerIndex, setFooterIndex] = useState(100);
  const [queryText, setQueryText] = useState("");
  const [querySnapshot, setQuerySnapshot] = useState("");
  const [animatedY] = useState(new Animated.Value(0));
  const [sortQuery, setSortQuery] = useState<SortObj>({
    value: "name",
    sort: "desc",
    label: "name asc",
  });
  const {
    data: allMonsterData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: allFetching,
  } = useInfiniteQuery<DjangoCall, Error>(
    ["BestiaryList", sortQuery.value],
    async ({ pageParam = "" }) => {
      let res;
      if (!!pageParam) {
        res = await axios.get(pageParam);
        return res.data;
      }
      res = await axios.get(`${BASE_QUERY+'/?ordering='+sortQuery.value}`, {});
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
      getNextPageParam: (lastPage) => lastPage.next ?? false,
    }
  );

  const { data: filterdMonsterData, isFetching: filteredFetching } = useQuery<
    { data: DjangoCall },
    Error
  >(
    ["BestiarySearch", querySnapshot, sortQuery.value],
    () =>
      axios(
        `${BASE_QUERY}/?search=${querySnapshot}&ordering=${sortQuery.value}${LIMIT}`
      ),
    { enabled: !!querySnapshot }
  );
  useEffect(() => {
    if (!allMonsterData?.pages.length) {
      return;
    }
    setFooterIndex(100 * allMonsterData?.pages.length);
  }, [allMonsterData?.pages.length]);
  useEffect(() => {
    queryClient.resetQueries("BestiaryList", {refetchPage: (page, index)=>index>=0});
    queryClient.resetQueries(["BestiarySearch",querySnapshot], {active: true});
  }, [sortQuery]);
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animatedY } } }],
    {
      useNativeDriver: true,
    }
  );
  const getItemLayout = useCallback(
    (_, index: number) => ({
      length: CARD_HEIGHT + 32,
      offset: (CARD_HEIGHT + 32) * index,
      index,
    }),
    []
  );

  const findMonsters = (query: string) => {
    setQuerySnapshot(query);
  };

  const _renderItem = ({ item, index }: { item: any; index: number }) => (
    <ListeItemAnimated
      key={item.name}
      y={animatedY}
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

  const footerElem = () => (
    <ListeItemAnimated
      onPress={() => {
        fetchNextPage();
      }}
      y={animatedY}
      index={!!!querySnapshot ? footerIndex : 0}
    >
      {!isFetchingNextPage ? (
        <Text style={{ alignSelf: "center" }}>
          {hasNextPage && "Load More..."}
        </Text>
      ) : (
        <ThemedLoader />
      )}
    </ListeItemAnimated>
  );

  const EmptyList = (
    <>
      {
    filteredFetching || allFetching?  Array(8)
        .fill(null)
        .map((_, index) => (
          <ListeItemAnimated
            onPress={() => {}}
            key={index}
            y={animatedY}
            index={index}
            style={styles.centeredContent}
          />
        ))
        :
        <></>
        }
    </>
  );

  return (
    <>
      <MyFilterModal
        visible={modal.isVisible}
        dismiss={modal.dismiss}
        data={MONSTER_FILTERS}
        setFilter={setSortQuery}
      />
      <SafeBackGround style={[styles.container]}>
        <BestiaryQueryHeader
          goHome={() => navigation.navigate("Home")}
          queryDisplay={querySnapshot}
          fireOffQuery={findMonsters}
          containsData={filterdMonsterData?.data.results.length}
          text={queryText}
          setText={setQueryText}
          showFilters={modal.show}
          sortText={sortQuery}
        />
        <AnimatedFlatList
          overScrollMode="always"
          scrollEventThrottle={16}
          style={{ width: "90%" }}
          indicatorStyle="white"
          bounces={false}
          data={
            !!querySnapshot
              ? filterdMonsterData?.data.results
              : allMonsterData?.pages.map((item) => item.results).flat()
          }
          extraData={allMonsterData}
          scrollToOverflowEnabled
          getItemLayout={getItemLayout}
          maxToRenderPerBatch={30}
          refreshControl={
            <RefreshControl
              refreshing={allFetching || (!!querySnapshot && filteredFetching)}
              onRefresh={() => {}}
              title="Pull to refresh"
              tintColor={theme.colors.border}
              titleColor={theme.colors.text}
              colors={[theme.colors.border]}
              progressBackgroundColor={theme.colors.background}
            />
          }
          ListEmptyComponent={EmptyList}
          ListFooterComponent={
            hasNextPage && !!!querySnapshot ? footerElem : null
          }
          renderItem={_renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyExtractor={(item, index) => {
            return index.toString();
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
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
});
