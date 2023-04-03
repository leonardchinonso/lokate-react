import { Image, StyleSheet, View } from "react-native";

function Logo({ customContainerStyles }) {
  return (
    <View style={[styles.container, customContainerStyles]}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "15%",
    height: "20%",
    width: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
