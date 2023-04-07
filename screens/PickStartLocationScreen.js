import { StyleSheet, Text, View } from "react-native";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import Card from "../components/ui/Card";
import TextString from "../components/ui/TextString";
import { HomepageDestinationConstants } from "../models/constants";
import IconButtonLink from "../components/ui/IconButtonLink";
import { SelectList } from "react-native-dropdown-select-list/index";
import PrimaryButton from "../components/ui/PrimaryButton";

function PickStartLocationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Last Visited" },
    { key: "2", value: "Saved Places" },
  ];

  function searchInputHandler(enteredText) {
    setSearchQuery(enteredText);
  }

  return (
    <View style={rootStyles.root}>
      <View style={textStyles.goSomewhereContainer}>
        <TextString textStyle={textStyles.goSomewhereText}>
          Go Somewhere
        </TextString>
      </View>
      <View style={textStyles.pickStartLocationContainer}>
        <TextString textStyle={{ fontSize: 17 }}>
          Pick a start location
        </TextString>
      </View>

      <View style={searchFieldStyles.container}>
        <TextInputBox
          placeholder={"Search Place"}
          contentType={"name"}
          onChange={searchInputHandler}
          keyboardType={"default"}
        ></TextInputBox>
      </View>

      <View style={startLocationGroupStyles.topContainer}>
        <IconButtonLink
          name={HomepageDestinationConstants.CurrentLocation}
          children={"Current Location"}
        />
        <IconButtonLink
          name={HomepageDestinationConstants.GoHome}
          children={"Home"}
        />
        <IconButtonLink
          name={HomepageDestinationConstants.GoToWork}
          children={"Work"}
        />
      </View>

      <View style={dropdownStyles.container}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save={"value"}
          dropdownStyles={{ backgroundColor: "white" }}
          dropdownTextStyles={{ fontSize: 17 }}
          placeholder={"Pick a place"}
        />
      </View>

      <View style={startLocationGroupStyles.bottomContainer}>
        <IconButtonLink
          name={HomepageDestinationConstants.Location}
          children={"Bull ring"}
        />
        <IconButtonLink
          name={HomepageDestinationConstants.Location}
          children={"Birmingham New Street"}
        />
        <IconButtonLink
          name={HomepageDestinationConstants.Location}
          children={"Curzon Building"}
        />
      </View>

      <View style={buttonGroupStyles.container}>
        <PrimaryButton>NEXT</PrimaryButton>
      </View>
    </View>
  );
}

export default PickStartLocationScreen;

const rootStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const searchFieldStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "23%",
    width: "80%",
  },
});

const textStyles = StyleSheet.create({
  goSomewhereText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 50,
  },
  goSomewhereContainer: {
    position: "absolute",
    top: "10%",
  },
  pickStartLocationContainer: {
    position: "absolute",
    top: "16%",
  },
});

const startLocationGroupStyles = StyleSheet.create({
  topContainer: {
    position: "absolute",
    top: "31%",
    width: "80%",
    height: "15%",
    justifyContent: "space-around",
  },
  bottomContainer: {
    position: "absolute",
    top: "58%",
    width: "80%",
    height: "15%",
    justifyContent: "space-around",
  },
});

const dropdownStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    width: "80%",
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
