import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "../../styles/colors";

// PrimaryButton is the component for a custom button used throughout the application
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

// style sheet for the component
const styles = StyleSheet.create({
  inner: {
    borderRadius: 10,
    backgroundColor: Colors.primaryPurple,
    paddingVertical: "5%",
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1,
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: Colors.primaryWhite,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
