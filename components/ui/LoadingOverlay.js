import { ActivityIndicator, View, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

// LoadingOverlay is the component for showing the
// loading screen when processes occur
function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.primaryPurple} />
    </View>
  );
}

export default LoadingOverlay;

// style sheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primaryWhite,
  },
});
