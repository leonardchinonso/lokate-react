import { StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TransportModeConstants } from "../../models/constants";
import Colors from "../../styles/colors";

// JourneyDescriptionCard is the component for the description card of each route
function JourneyDescriptionCard({
  transportMode,
  transportDuration,
  toPointName,
  departsAt,
}) {
  return (
    <ItemCard customStyles={styles.container} pressable={false}>
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
        <TextString textStyle={styles.textStyle}>
          {transportMode === TransportModeConstants.Walk
            ? "Walk to "
            : "Get off at "}
          {toPointName}
        </TextString>
        <TextString textStyle={styles.textStyle}>
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

// style sheet for the journey card description component
const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: { fontSize: 12, color: Colors.primaryWhite },
});
