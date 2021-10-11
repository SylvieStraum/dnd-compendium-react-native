import React, { useMemo, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { CARD_HEIGHT as DEFAULT_HEIGHT, Card } from "./Card";
import {
  ViewProps,
} from "./Themed";
import { useTheme } from "../hooks/useTheme";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListeItemAnimatedProps extends ViewProps {
  onPress: () => void;
  y: Animated.Value;
  index: number;
}

const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 80;

export const ListeItemAnimated: React.FC<ListeItemAnimatedProps> = ({
  onPress,
  y,
  index,
  children
}) => {
  const theme = useTheme();

  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;

  const translateY = useMemo(() => {
    return Animated.add(
      Animated.add(
        y,
        y.interpolate({
          inputRange: [0, index * CARD_HEIGHT],
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
  }, [y]);
  //modifies the value of scale and opacity based on distance to top and bottom of screen.
  const opacity = useMemo(() => {
    return position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.1, 1, 1, 0.1],
      extrapolate: "clamp",
    });
  }, [y]);

  const scale = useMemo(() => {
    return position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.1, 1, 1, 0.1],
      extrapolate: 'clamp',
    });
  }, [y]);
  return (
    <Animated.View
      style={[
        { opacity: opacity, transform: [{ translateY }, { scale }]},
        styles.container,
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Card
          style={{
            justifyContent: "space-evenly",
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: "transparent",
            width: "100%",
            borderColor:theme.colors.border,
            borderWidth:1
          }}
        >
         {children}
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MARGIN,
    alignSelf: "center",
    width: "100%",
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  monsterType: {
    fontStyle: "normal",
    fontSize: 14,
  },
  challenge: {
    fontSize: 16,
  },
});
