import { Image, StyleSheet, View } from "react-native";

function Logo() {
  return (
    <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
});
