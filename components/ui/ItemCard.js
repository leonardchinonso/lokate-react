import { StyleSheet, View } from "react-native";

// ItemCard is a component that shows a single item with
// its children configured from the parent
function ItemCard({ children, customStyles, pressable }) {
  // if the item card can NOT be pressed, DO NOT add shadow styles
  if (pressable === false) {
    return <View style={[rootStyles.root, customStyles]}>{children}</View>;
  }

  // if the item card can be pressed, add shadow styles
  return (
    <View style={[rootStyles.root, rootStyles.setShadow, customStyles]}>
      {children}
    </View>
  );
}

export default ItemCard;

// style sheet for the item card
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
