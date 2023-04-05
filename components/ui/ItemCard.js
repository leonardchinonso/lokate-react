import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";

function ItemCard({ children, customStyles }) {
  return <View style={[rootStyles.root, customStyles]}>{children}</View>;
}

export default ItemCard;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: "10%",
    backgroundColor: Colors.primaryWhite,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
});
