import { StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";

function Triangle() {
  return <View style={styles.container}></View>;
}

export default Triangle;

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: Colors.primaryGrey,
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderRadius: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: Colors.primaryGrey,
  },
});
