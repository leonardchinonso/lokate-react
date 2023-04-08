import { Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { FontAwesome5 } from "@expo/vector-icons";
import { TransportModeConstants } from "../../models/constants";

function JourneyDescriptionCard({
  transportMode,
  transportDuration,
  toPointName,
  departsAt,
}) {
  return (
    <Pressable style={({ pressed }) => (pressed ? styles.pressed : null)}>
      <ItemCard customStyles={itemCardCustomStyles.container}>
        <View>
          <FontAwesome5 name={transportMode} size={24} color="black" />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            height: "130%",
            width: "60%",
          }}
        >
          <TextString textStyle={{ fontSize: 12 }}>
            {transportMode === TransportModeConstants.Walk
              ? "Walk to "
              : "Get off at "}
            {toPointName}
          </TextString>
          <TextString textStyle={{ fontSize: 12 }}>
            {departsAt
              ? transportMode === TransportModeConstants.Walk
                ? "Start walking at " + departsAt
                : "Departs at " + departsAt
              : null}
          </TextString>
        </View>
        <TextString textStyle={{ fontSize: 15 }}>
          {transportDuration}
          {" mins"}
        </TextString>
      </ItemCard>
    </Pressable>
  );
}

export default JourneyDescriptionCard;

const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  vehicleSection: {
    width: "80%",
    height: "200%",
    flexDirection: "row",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});
