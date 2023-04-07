import { StyleSheet, View } from "react-native";
import Colors from "../styles/colors";
import TextString from "../components/ui/TextString";
import TextInputBox from "../components/ui/TextInputBox";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list/index";
import { UseAsConstants } from "../models/constants";
import PrimaryButton from "../components/ui/PrimaryButton";
import { Header } from "../styles/text";

function ModifyPlaceScreen({ action }) {
  const [name, setName] = useState("Abbey Road");
  const [selected, setSelected] = useState(UseAsConstants.None);

  const data = [
    { key: "1", value: UseAsConstants.None },
    { key: "2", value: UseAsConstants.Home },
    { key: "3", value: UseAsConstants.Work },
  ];

  function nameInputHandler(nameText) {
    setName(nameText);
  }

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>
          {action === "edit" ? "Edit A Place" : "Add A Place"}
        </TextString>
      </View>
      <View style={nameSectionStyles.container}>
        <TextString textStyle={nameSectionStyles.nameText}>Name</TextString>
        <View style={nameSectionStyles.textInputBox}>
          <TextInputBox
            placeholder={name}
            contentType={"name"}
            onChange={nameInputHandler}
            keyboardType={"default"}
          />
        </View>
      </View>
      <View style={useAsSectionStyles.container}>
        <TextString textStyle={useAsSectionStyles.useAsText}>Use As</TextString>
        <View style={useAsSectionStyles.useAsDropdownContainer}>
          <View style={dropdownStyles.container}>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save={"value"}
              dropdownStyles={{ backgroundColor: "white" }}
              dropdownTextStyles={{ fontSize: 17 }}
              placeholder={"Use as"}
            />
          </View>
        </View>
      </View>

      <View style={buttonGroupStyles.container}>
        <PrimaryButton>{action === "edit" ? "SAVE" : "ADD"}</PrimaryButton>
      </View>
    </View>
  );
}

export default ModifyPlaceScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const nameSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  nameText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  textInputBox: {
    width: "70%",
  },
});

const useAsSectionStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  useAsText: {
    color: Colors.primaryBlack,
    fontWeight: "bold",
    fontSize: 20,
  },
  useAsDropdownContainer: {
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
