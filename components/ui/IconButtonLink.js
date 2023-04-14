import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";

function IconButtonLink({ name, children, onPress, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>{icon}</View>
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
    marginVertical: 5,
    direction: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  buttonText: {
    color: Colors.primaryDarkPurple,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },
  pressed: {
    opacity: 0.5,
  },
});
