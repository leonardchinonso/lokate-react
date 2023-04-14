import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

function PrimaryButton({ children, onPressStyle, customStyles, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.inner, customStyles, styles.pressed, onPressStyle]
          : [styles.inner, customStyles]
      }
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  inner: {
    borderRadius: 10,
    backgroundColor: Colors.primaryPurple,
    // paddingVertical: "9%",
    // paddingHorizontal: "25%",
    height: "100%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
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
