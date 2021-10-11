import React from "react";
import { StyleSheet } from "react-native";
import { DjangoMonster } from "../../../types";
import { ViewProps, Text, TransparentView } from "../../../components/Themed";
import { useTheme } from "../../../hooks/useTheme";


interface BestiaryListItemProps extends ViewProps {
  data?: DjangoMonster;
}

export const BestiaryListItem: React.FC<BestiaryListItemProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <>
      {data?.name && (
        <>
          <Text style={styles.name}>{data?.name}</Text>
          <TransparentView
            style={[
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={styles.challenge}>
              CR:{data.challenge_rating} |{" "}
              <Text style={styles.monsterType}>
                {data.size} {data.type} {!!data?.subtype && `(${data.subtype})`}
              </Text>
            </Text>
            <Text style={styles.monsterType}>{data.document__slug}</Text>
          </TransparentView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
