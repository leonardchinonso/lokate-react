import { StyleSheet, Text } from "react-native";
import Colors from "../../styles/colors";

// TextString is the component for rendering a custom
// text component
function TextString({ children, textStyle }) {
  return <Text style={[styles.defaultText, textStyle]}>{children}</Text>;
}

export default TextString;

// the style sheet for the component
const styles = StyleSheet.create({
  defaultText: {
    color: Colors.secondaryDarkGrey,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
  },
});
