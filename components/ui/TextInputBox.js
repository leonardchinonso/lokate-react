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
  multiline,
  autoCorrect,
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
        autoCorrect={autoCorrect}
        onChangeText={onChange}
        textContentType={contentType}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType === undefined ? "default" : keyboardType}
        multiline={multiline}
      ></TextInput>
    </View>
  );
}

export default TextInputBox;

const rootStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.secondaryDarkGrey,
    width: "100%",
  },
  input: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "left",
    color: Colors.almostBlack,
  },
});
