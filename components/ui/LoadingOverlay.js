import { ActivityIndicator, View, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.primaryPurple} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primaryWhite,
  },
});
