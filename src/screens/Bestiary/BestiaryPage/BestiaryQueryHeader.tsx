import React, { SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Text, TransparentView, View } from "../../../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { ModularIconButton } from "../../../components/ModularIconButton";
import { useTheme } from "../../../hooks/useTheme";
import { SortObj } from "../../../components/MyFilterModal";
import { BaseIconButton } from "../../../components/forms/BaseIconButton";

interface QueryHeaderProps {
  fireOffQuery: (query: string) => void;
  queryDisplay: string;
  goHome: () => void;
  containsData?: number;
  setText: React.Dispatch<SetStateAction<string>>;
  text: string;
  showFilters: () => void;
  sortText?: SortObj;
}

export const BestiaryQueryHeader: React.FC<QueryHeaderProps> = ({
  queryDisplay,
  fireOffQuery,
  goHome,
  setText,
  text,
  showFilters,
  sortText,
}) => {
  const theme = useTheme();

  const headerDisplay = !!queryDisplay ? (
    <TransparentView style={[styles.searchBar]}>
      <Text style={{fontSize:24}}>Search for: {queryDisplay}</Text>
      <ModularIconButton size={20} iconType="clear" onPress={()=>{
        setText('')
        fireOffQuery('')
    }} />
    </TransparentView>
  ) : (
    <TextInput
      onSubmitEditing={() => fireOffQuery(text)}
      style={[
        styles.searchBar,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
      value={text}
      placeholder="find monster"
      placeholderTextColor="#fff"
      onChangeText={(text) => setText(text)}
    />
  );
  return (
    <View
      style={[
        styles.headerBar,
        {
          borderBottomColor: theme.colors.backgroundColor,
          borderWidth: 1,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <ModularIconButton onPress={goHome} style={styles.icon} iconType="home" />
      {headerDisplay}
      <ModularIconButton
        onPress={showFilters}
        style={[styles.icon]}
        iconType="filter-list"
        sortDirection={sortText?.sort}
        sortLabel={sortText?.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
  },
  icon: {
    width: "20%",
  },
  searchBar: {
    flexDirection:'row',
    width: "60%",
    height: "80%",
    fontSize: 18,
    color: "#fff",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems:'center',
    alignSelf:'center'
  },
});
