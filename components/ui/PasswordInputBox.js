import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextInputBox from "./TextInputBox";
import useTogglePasswordVisibility from "../../hooks/useTogglePasswordVisibility";
import Colors from "../../styles/colors";

function PasswordInputBox() {
  const { showPassword, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility;

  // console.log(showPassword, rightIcon);

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
      <Pressable
        style={{ backgroundColor: "black" }}
        onPress={handlePasswordVisibility}
      >
        <MaterialCommunityIcons
          name={rightIcon}
          size={22}
          color={Colors.primaryLightBlue}
        />
      </Pressable>
    </View>
  );
}

export default PasswordInputBox;

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: "black",
    width: "100%",
    flexDirection: "row",
  },
});
