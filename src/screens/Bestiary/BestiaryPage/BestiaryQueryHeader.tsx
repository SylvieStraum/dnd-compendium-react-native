import React from "react";
import {
  StyleSheet,
} from "react-native";
import { View } from "../../../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { HomeButton } from "../../../components/HomeButton";

interface QueryHeaderProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  fireOffQuery: () => void;
  goHome: () => void;
}

export const BestiaryQueryHeader: React.FC<QueryHeaderProps> = ({
  query,
  setQuery,
  fireOffQuery,
  goHome,
}) => {
  return (
    <View style={styles.headerBar}>
      <HomeButton onPress={goHome} />
      <TextInput
        onSubmitEditing={fireOffQuery}
        style={styles.searchBar}
        value={query}
        placeholder="find monster"
        onChangeText={(text) => setQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  searchBar: {
    width: "60%",
    height: "80%",
    fontSize:18
  },
});
