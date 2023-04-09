import { Pressable, Text, StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";

function PrimaryButtonLink({ children, style, textStyle, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? [styles.pressed, style] : null)}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButtonLink;

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.primaryWhite,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.5,
  },
});
