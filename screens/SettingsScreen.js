import { useContext, useState } from "react";
import TextString from "../components/ui/TextString";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";
import { AppearanceConstants, PrecisionConstants } from "../models/constants";
import { SettingsContext } from "../store/context/SettingsContext";
import { useNavigation } from "@react-navigation/native";

// SettingsScreen renders the settings screen for a user
function SettingsScreen() {
  // get the settings context to use the user settings
  const settingsContext = useContext(SettingsContext);

  // get the navigation hook instance for moving through components
  const navigation = useNavigation();

  // create a state to hold the app appearance
  const [selectedAppearance, setSelectedAppearance] = useState(
    settingsContext.appAppearance
  );

  // create a state to hold the app precision
  const [selectedPrecision, setSelectedPrecision] = useState(
    settingsContext.appPrecision
  );

  // appearanceData holds the values for the appearance dropdown
  const appearanceData = [
    { key: "1", value: AppearanceConstants.LightMode },
    { key: "2", value: AppearanceConstants.DarkMode },
  ];

  // precisionData holds the values for the precision dropdown
  const precisionData = [
    { key: "1", value: PrecisionConstants.Approximate },
    { key: "2", value: PrecisionConstants.Exact },
  ];

  // onClickOk handles the event when a user clicks OK on the alert box
  function onClickOk() {
    // go back to the profile page
    navigation.goBack();
  }

  // onSave saves the user settings to the onDevice storage
  function onSave() {
    // set the appearance and precision settings in the settings context
    settingsContext.setAppAppearance(selectedAppearance);
    settingsContext.setAppPrecision(selectedPrecision);

    // show the alert for successful data saving
    Alert.alert("Settings saved successfully", "", [
      { text: "OK", onPress: onClickOk },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View style={dropdownSectionStyles.container}>
          <View
            style={{
              paddingLeft: "1%",
              marginTop: "10%",
              marginVertical: "1%",
            }}
          >
            <TextString textStyle={textStyles.label}>Appearance</TextString>
          </View>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setSelectedAppearance(val)}
              data={appearanceData}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 14 }}
              placeholder={settingsContext.appAppearance}
            />
          </View>
        </View>

        <View style={dropdownSectionStyles.container}>
          <View
            style={{ paddingLeft: "1%", marginTop: "5%", marginVertical: "1%" }}
          >
            <TextString textStyle={textStyles.label}>Precision</TextString>
          </View>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setSelectedPrecision(val)}
              data={precisionData}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 14 }}
              placeholder={settingsContext.appPrecision}
            />
          </View>
        </View>

        <PrimaryButton
          customStyles={{
            position: "absolute",
            bottom: "1%",
            width: "100%",
            left: 14,
          }}
          onPress={onSave}
        >
          SAVE
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;

// rootStyles is the style sheet for the main component
const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingHorizontal: 14,
  },
});

// textStyles is the style sheet for the text containers and labels
const textStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  label: {
    color: Colors.primaryBlack,
    fontSize: 14,
  },
});

// dropdownSectionStyles is the style sheet for the dropdown container
const dropdownSectionStyles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
  },
  useAsText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
});

// dropdownStyles is the style sheet for the dropdown menu
const dropdownStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryDarkGrey,
    backgroundColor: Colors.primaryWhite,
    width: "100%",
  },
});
