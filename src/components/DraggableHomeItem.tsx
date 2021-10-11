import React, { useRef } from "react";
import { Animated, StyleSheet, PanResponder, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Theme } from "../hooks/useTheme";
import { View, ViewProps } from "./Themed";

const { width: sWidth } = Dimensions.get("window");
const WIDTH = (sWidth * 0.8) / 2;

interface DraggableHomeItemProps extends ViewProps {
  theme: Theme;
  onPress: () => void;
}

export const DraggableHomeItem: React.FC<DraggableHomeItemProps> = ({
  theme,
  children,
  onPress,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;
  panResponder.panHandlers.onResponderTerminate = onPress;
  return (
    <Animated.View
      style={[
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: theme.colors.backgroundColor },
        ]}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WIDTH,
    width: WIDTH,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
