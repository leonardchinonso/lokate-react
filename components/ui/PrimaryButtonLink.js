import { Pressable, Text, StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";

// PrimaryButtonLink is the component for clickable links throughout the application
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

// style sheet for the component
const styles = StyleSheet.create({
  buttonText: {
    color: Colors.primaryWhite,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.5,
  },
});
