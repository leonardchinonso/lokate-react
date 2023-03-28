import { StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";

function Card({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1, // always wrap a view around the card to allow it to fill the view container
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
    borderStyle: "solid",
    borderTopColor: Colors.primaryDarkBlue,
    borderTopWidth: 3,
  },
});
