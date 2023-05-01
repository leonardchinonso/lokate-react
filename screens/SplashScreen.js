import { Image, StyleSheet, View } from "react-native";

// SplashScreen renders the splash screen on app initialization
function SplashScreen() {
  return (
    <View style={styles.rootContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
      />
    </View>
  );
}
export default SplashScreen;

// styles is the style sheet for the component
const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%", // how much percentage of its view container should the width take
    height: "100%", // how much percentage of its view container should the height take
    resizeMode: "contain",
  },
});
