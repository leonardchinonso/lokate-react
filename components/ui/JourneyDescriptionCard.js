import { Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TransportModeConstants } from "../../models/constants";
import Colors from "../../styles/colors";

function JourneyDescriptionCard({
  transportMode,
  transportDuration,
  toPointName,
  departsAt,
}) {
  return (
    <ItemCard customStyles={itemCardCustomStyles.container} pressable={false}>
      <View>
        {transportMode === "tube" ? (
          <Ionicons name={"subway"} size={24} color={Colors.primaryWhite} />
        ) : (
          <FontAwesome5
            name={transportMode}
            size={24}
            color={Colors.primaryWhite}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <TextString textStyle={{ fontSize: 12, color: Colors.primaryWhite }}>
          {transportMode === TransportModeConstants.Walk
            ? "Walk to "
            : "Get off at "}
          {toPointName}
        </TextString>
        <TextString textStyle={{ fontSize: 12, color: Colors.primaryWhite }}>
          {departsAt
            ? transportMode === TransportModeConstants.Walk
              ? "Start walking at " + departsAt
              : "Departs at " + departsAt
            : null}
        </TextString>
      </View>
      <TextString textStyle={{ fontSize: 15, color: Colors.primaryWhite }}>
        {transportDuration}
      </TextString>
    </ItemCard>
  );
}

export default JourneyDescriptionCard;

const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primaryPurple,
    paddingHorizontal: 20,
    marginBottom: "5%",
    paddingVertical: "3%",
  },
  vehicleSection: {
    // width: "80%",
    // height: "200%",
    flexDirection: "row",
    alignItems: "center",
  },
});
