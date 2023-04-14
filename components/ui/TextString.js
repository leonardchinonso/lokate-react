import { StyleSheet, Text } from "react-native";
import Colors from "../../styles/colors";

function TextString({ children, textStyle }) {
  const { defaultText } = styles;

  return <Text style={[defaultText, textStyle]}>{children}</Text>;
}

export default TextString;

const styles = StyleSheet.create({
  defaultText: {
    color: Colors.secondaryDarkGrey,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
  },
});
