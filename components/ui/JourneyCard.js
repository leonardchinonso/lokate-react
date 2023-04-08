import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

function JourneyCard({ transportModes, journeyTime }) {
  return (
    <Pressable style={({ pressed }) => (pressed ? styles.pressed : null)}>
      <ItemCard customStyles={itemCardCustomStyles.container}>
        <View style={itemCardCustomStyles.vehicleSection}>
          <FlatList
            key={transportModes.length}
            numColumns={transportModes.length}
            data={transportModes}
            renderItem={(itemData) => (
              <View style={{ flexDirection: "row" }}>
                <View style={transportModesStyle.singleMode}>
                  <FontAwesome5 name={itemData.item} size={24} color="black" />
                </View>
                {itemData.index < transportModes.length - 1 ? (
                  <View style={transportModesStyle.caret}>
                    <AntDesign name="caretright" size={15} color="black" />
                  </View>
                ) : null}
              </View>
            )}
          />
        </View>
        <TextString textStyle={{ fontSize: 15 }}>{journeyTime}</TextString>
      </ItemCard>
    </Pressable>
  );
}

export default JourneyCard;

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

const transportModesStyle = StyleSheet.create({
  singleMode: {
    marginRight: "7%",
  },
  caret: {
    justifyContent: "center",
  },
});
