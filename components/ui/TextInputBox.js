import { StyleSheet, TextInput, View } from "react-native";
import Colors from "../../styles/colors";
import React from "react";

function TextInputBox({
  editable,
  placeholder,
  onChange,
  containerStyle,
  contentType,
  keyboardType,
  name,
  secureTextEntry,
  value,
  inputStyle,
}) {
  return (
    <View style={[rootStyles.container, containerStyle]}>
      <TextInput
        editable={editable}
        style={[rootStyles.input, inputStyle]}
        name={name}
        placeholder={placeholder}
        placeholderTextColor={Colors.secondaryDarkGrey}
        autoCapitalize={"none"}
        autoCorrect={false}
        onChangeText={onChange}
        textContentType={contentType}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType === undefined ? "default" : keyboardType}
      ></TextInput>
    </View>
  );
}

export default TextInputBox;

const rootStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkGrey,
  },
  input: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: 8,
    width: "100%",
    padding: 14,
    fontSize: 20,
    fontWeight: "normal",
    textAlign: "left",
    color: Colors.almostBlack,
  },
});
