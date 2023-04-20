import { StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "../../styles/colors";

function JourneyCard({ transportModes, journeyTime, pressable }) {
  return (
    <ItemCard
      customStyles={itemCardCustomStyles.container}
      pressable={pressable}
    >
      <View style={itemCardCustomStyles.vehicleSection}>
        {transportModes.map((mode, index) => (
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: Colors.primaryWhite,
            }}
            key={index}
          >
            {mode === "tube" ? (
              <Ionicons name={"subway"} size={24} color={Colors.primaryWhite} />
            ) : (
              <FontAwesome5 name={mode} size={24} color={Colors.primaryWhite} />
            )}
            {index < transportModes.length - 1 ? (
              <View
                style={{
                  justifyContent: "center",
                  marginRight: "1.5%",
                }}
              >
                <AntDesign
                  name="caretright"
                  size={15}
                  color={Colors.primaryWhite}
                />
              </View>
            ) : null}
          </View>
        ))}
      </View>
      <TextString textStyle={{ fontSize: 15, color: Colors.primaryWhite }}>
        {journeyTime}
      </TextString>
    </ItemCard>
  );
}

export default JourneyCard;

const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryPurple,
    paddingVertical: "5%",
    // width: "70%",
  },
  vehicleSection: {
    // width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
