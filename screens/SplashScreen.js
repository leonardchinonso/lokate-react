import {Image, StyleSheet, View} from "react-native";

function SplashScreen() {
  return (
    <View style={styles.rootContainer}>
      <Image style={styles.image} source={require("../assets/images/logo.png")}/>
    </View>
  )
}
export default SplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "50%", // how much percentage of its view container should the width take
    height: "100%", // how much percentage of its view container should the height take
    resizeMode: "contain",
  }
})