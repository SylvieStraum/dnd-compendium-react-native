import { StatusBar } from "expo-status-bar";
import React, { Dispatch, SetStateAction } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useTheme } from "../hooks/useTheme";
import { Text, View, ViewProps } from "./Themed";

export interface SortObj {
  value: string;
  sort: "asc" | "desc";
  label: string;
}

interface MyModalProps extends ViewProps {
  visible: boolean;
  dismiss: () => void;
  data: SortObj[];
  setFilter: Dispatch<SetStateAction<SortObj>>;
}

const { width } = Dimensions.get("window");
const ratio = 240 / 362;
export const MODAL_WIDTH = width * 0.8;
export const MODAL_HEIGHT = MODAL_WIDTH * ratio;

export const MyFilterModal: React.FC<MyModalProps> = ({
  visible,
  dismiss,
  data,
  setFilter,
}) => {
  const theme = useTheme();
  const _renderItem = ({ item, index }: { item: SortObj; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        setFilter(item);
        dismiss();
      }}
      style={styles.touchable}
    >
      <Text
        style={[
          styles.textStyle,
          { color: theme.colors.tint, alignSelf: "center" },
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}
      animationIn="zoomInRight"
      style={styles.modalView}
    >
      <View style={styles.centeredView}>
        <FlatList
          overScrollMode="always"
          style={{ width: "90%" }}
          indicatorStyle="white"
          data={data}
          scrollToOverflowEnabled
          renderItem={_renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderRadius: 20,
  },
  modalView: {
    margin: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  touchable: {
    width: "100%",
    height: 40,
  },
});
