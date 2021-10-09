import React, { useMemo } from "react";
import { Pressable, Animated, Dimensions, StyleSheet } from "react-native";
import { SmallMonsterCall } from "../../../types";
import { CARD_HEIGHT as DEFAULT_HEIGHT, Card } from "../../../components/Card";
import { View, ViewProps, Text } from "../../../components/Themed";

interface BestiaryListItemProps extends ViewProps {
  onPress: () => void;
  y: Animated.Value;
  data?: SmallMonsterCall;
  index: number;
}

const MARGIN = 16;
const CARD_HEIGHT = DEFAULT_HEIGHT + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;

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

  const translateY = useMemo(() => {
    return Animated.add(
      Animated.add(
        y,
        y.interpolate({
          inputRange: [0, 0.00001 + index * CARD_HEIGHT],
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
      extrapolate: "clamp",
    });
  }, [y]);
  return (
    <Animated.View
      style={[
        { opacity: opacity, transform: [{ translateY }, { scale }] },
        styles.container,
      ]}
    >
      <Pressable onPress={onPress}>
        <Card
          style={{
            justifyContent: "space-around",
            borderRadius: 8,
            paddingHorizontal: 12,
          }}
        >
          {data?.name && (
            <>
              <Text style={styles.name}> {data?.name}</Text>
              <Text style={styles.challenge}>
                CR:{data.challenge_rating} | <Text style={styles.monsterType}>{data.size} {data.type}{" "}
                {!!data?.subtype && `(${data.subtype})`}</Text>
              </Text>
            </>
          )}
        </Card>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: MARGIN,
    alignSelf: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize:18
  },
  monsterType: {
    fontStyle:'italic',
    fontSize:13
  },
  challenge: {
    fontSize:14
  },
});
