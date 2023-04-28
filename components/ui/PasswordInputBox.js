import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInputBox from "./TextInputBox";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import Colors from "../../styles/colors";

// PasswordInputBox is the component for rendering the password input box
function PasswordInputBox({ placeholder, onChange, value, customStyles }) {
  // get the password icon and the toggle visibility state using a custom hook
  const { showPassword, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <View style={[styles.inputContainer, customStyles]}>
      <TextInputBox
        name={"password"}
        placeholder={placeholder}
        contentType={"newPassword"}
        secureTextEntry={showPassword}
        value={value}
        onChange={onChange}
      />
      <Pressable style={styles.eye} onPress={handlePasswordVisibility}>
        <MaterialCommunityIcons
          name={rightIcon}
          size={22}
          color={Colors.secondaryDarkGrey}
        />
      </Pressable>
    </View>
  );
}

export default PasswordInputBox;

// style sheet for the component
const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
  },
  eye: {
    position: "absolute",
    top: "30%",
    left: "90%",
  },
});
