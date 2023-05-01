/**
 * This file holds the implementation for setting common Headers across screens
 * */

import { StyleSheet } from "react-native";
import Colors from "./colors";

// Header is the common style sheet for header texts on screens
export const Header = StyleSheet.create({
  container: {
    position: "absolute",
    top: "10%",
  },
  text: {
    color: Colors.primaryBlack,
    fontWeight: "normal",
    fontSize: 20,
  },
});
