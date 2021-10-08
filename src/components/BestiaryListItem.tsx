import React from "react";
import {
  Pressable,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SmallMonsterCall } from "../types";
import { CARD_HEIGHT as DEFAULT_HEIGHT, Card } from "./Card";
import { ViewProps } from "./Themed";

interface BestiaryListItemProps extends ViewProps {
  onPress: () => void;
  y: Animated.Value;
  data: SmallMonsterCall;
  index: number;
}

const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  container: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },
});

export const BestiaryListItem: React.FC<BestiaryListItemProps> = ({
  onPress,
  y,
  data,
  index,
}) => {

  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + (index * CARD_HEIGHT)],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  //modifies the value of scale and opacity based on distance to top and bottom of screen.
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.3, 1, 1, 0.3],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.3, 1, 1, 0.3],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={[
        { opacity: opacity, transform: [{ translateY }, { scale }] },
        styles.container,
      ]}
    >
      <Card>
        <Pressable onPress={onPress}>
          <Text style={{ fontSize: 18 }}> {data.name}</Text>
        </Pressable>
      </Card>
    </Animated.View>
  );
};
