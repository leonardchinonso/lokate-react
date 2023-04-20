import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";

function ItemCard({ children, customStyles, pressable }) {
  if (pressable === false) {
    return <View style={[rootStyles.root, customStyles]}>{children}</View>;
  }
  return (
    <View style={[rootStyles.root, rootStyles.setShadow, customStyles]}>
      {children}
    </View>
  );
}

export default ItemCard;

const rootStyles = StyleSheet.create({
  root: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
  setShadow: {
    shadowOffset: { width: 0, height: 4 },
  },
});
