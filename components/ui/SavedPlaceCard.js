import { Image, Pressable, StyleSheet, View } from "react-native";
import ItemCard from "./ItemCard";
import TextString from "./TextString";

function SavedPlaceCard({ onEdit, onDelete }) {
  return (
    <View>
      <ItemCard customStyles={itemCardCustomStyles.container}>
        <View style={textStyles.container}>
          <TextString textStyle={{ fontSize: 20 }}>Abbey Road</TextString>
        </View>
        <View style={imageGroupStyles.container}>
          <Pressable
            style={({ pressed }) => (pressed ? imageGroupStyles.pressed : null)}
            onPress={onEdit}
          >
            <Image
              style={imageGroupStyles.image}
              source={require("../../assets/images/edit_icon.png")}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => (pressed ? imageGroupStyles.pressed : null)}
            onPress={onDelete}
          >
            <Image
              style={imageGroupStyles.image}
              source={require("../../assets/images/delete_icon.png")}
            />
          </Pressable>
        </View>
      </ItemCard>
    </View>
  );
}

export default SavedPlaceCard;

const textStyles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const imageGroupStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "20%",
  },
  pressed: {
    opacity: 0.5,
  },
});

const itemCardCustomStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
