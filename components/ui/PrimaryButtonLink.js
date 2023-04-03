import { Pressable, Text, StyleSheet, View } from "react-native";
import Colors from "../../styles/colors";

function PrimaryButtonLink({ children, style, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.inner, styles.pressed, style] : styles.inner
      }
    >
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButtonLink;

const styles = StyleSheet.create({
  inner: {
    color: Colors.primaryGrey,
  },
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
