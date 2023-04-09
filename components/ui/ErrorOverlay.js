import { View, StyleSheet, Text } from "react-native";
import Colors from "../../styles/colors";
import PrimaryButton from "./PrimaryButton";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <View
        style={{
          width: "20%",
          height: "7%",
          justifyContent: "center",
        }}
      >
        <PrimaryButton customStyles={{ paddingTop: "7%" }} onPress={onConfirm}>
          Okay
        </PrimaryButton>
      </View>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
});
