import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInputBox from "./TextInputBox";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import Colors from "../../styles/colors";

function PasswordInputBox() {
  const { showPassword, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const [password, setPassword] = useState("");

  function onChange(text) {
    setPassword(text);
  }

  return (
    <View style={styles.inputContainer}>
      <TextInputBox
        name={"password"}
        placeholder={"Password"}
        contentType={"newPassword"}
        secureTextEntry={showPassword}
        value={password}
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
