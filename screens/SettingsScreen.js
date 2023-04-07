import { useState } from "react";

import TextString from "../components/ui/TextString";
import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import { Header } from "../styles/text";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { AppearanceConstants, PrecisionConstants } from "../models/constants";

function SettingsScreen() {
  const [selectedPrecision, setSelectedPrecision] = useState(
    PrecisionConstants.Approximate
  );
  const [selectedAppearance, setSelectedAppearance] = useState(
    AppearanceConstants.LightMode
  );

  const appearanceData = [
    { key: "1", value: AppearanceConstants.LightMode },
    { key: "2", value: AppearanceConstants.DarkMode },
  ];

  const precisionData = [
    { key: "1", value: PrecisionConstants.Approximate },
    { key: "2", value: PrecisionConstants.Exact },
  ];

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Settings</TextString>
      </View>
      <View style={appearanceSectionStyles.container}>
        <TextString textStyle={appearanceSectionStyles.appearanceText}>
          Appearance
        </TextString>
        <View style={appearanceSectionStyles.appearanceDropdownContainer}>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setSelectedAppearance(val)}
              data={appearanceData}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 17 }}
              placeholder={"Appearance"}
            />
          </View>
        </View>
      </View>
      <View style={precisionSectionStyles.container}>
        <TextString textStyle={precisionSectionStyles.precisionText}>
          Precision
        </TextString>
        <View style={precisionSectionStyles.precisionDropdownContainer}>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setSelectedPrecision(val)}
              data={precisionData}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 17 }}
              placeholder={"Precision"}
            />
          </View>
        </View>
      </View>

      <View style={buttonGroupStyles.container}>
        <PrimaryButton>SAVE</PrimaryButton>
      </View>
    </View>
  );
}

export default SettingsScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const appearanceSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  appearanceText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  appearanceDropdownContainer: {
    width: "70%",
  },
});

const precisionSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  precisionText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  precisionDropdownContainer: {
    width: "70%",
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkGrey,
    backgroundColor: "white",
  },
});

const buttonGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "80%",
    height: "20%",
  },
});
