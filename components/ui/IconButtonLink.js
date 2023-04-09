import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";
import { GetIconPath } from "../../styles/icons";

function IconButtonLink({ name, children, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={GetIconPath(name)} />
      </View>
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : null)}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default IconButtonLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageContainer: {
    width: "11%",
    height: "100%",
    marginRight: "5%",
  },
  buttonText: {
    color: Colors.primaryDarkBlue,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 25,
  },
  pressed: {
    opacity: 0.5,
  },
});
