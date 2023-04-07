import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

function PrimaryButton({ children, onPressStyle, customStyles }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.inner, customStyles, styles.pressed, onPressStyle]
          : [styles.inner, customStyles]
      }
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  inner: {
    borderRadius: 8,
    backgroundColor: Colors.primaryLightBlue,
    paddingVertical: "9%",
    paddingHorizontal: "25%",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: Colors.primaryWhite,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 12,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
