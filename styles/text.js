import { StyleSheet } from "react-native";
import Colors from "./colors";

export const Header = StyleSheet.create({
  container: {
    position: "absolute",
    top: "10%",
  },
  text: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
});
