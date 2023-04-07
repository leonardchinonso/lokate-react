import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list/index";
import { UseAsConstants } from "../models/constants";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";
import ModifyPlaceScreen from "./ModifyPlaceScreen";

function AddPlaceScreen() {
  return <ModifyPlaceScreen action={"add"} />;
}

export default AddPlaceScreen;
