import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/colors";
import PrimaryButton from "./PrimaryButton";

// ErrorOverlay is the custom component for displaying the server error
function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          customStyles={styles.buttonCustomStyle}
          onPress={onConfirm}
        >
          Okay
        </PrimaryButton>
      </View>
    </View>
  );
}

export default ErrorOverlay;

// style sheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryWhite,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "20%",
    height: "7%",
    justifyContent: "center",
  },
  buttonCustomStyle: { paddingVertical: "7%", height: 30 },
});
