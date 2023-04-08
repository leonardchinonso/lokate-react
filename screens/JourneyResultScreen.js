import { FlatList, StyleSheet, View } from "react-native";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useEffect, useState } from "react";
import JourneyCard from "../components/ui/JourneyCard";

function JourneyResultScreen() {
  const [startLocText, setStartLocText] = useState("");
  const [endLocText, setEndLocText] = useState("");

  useEffect(() => {
    setStartLocText("66 Westferry Road");
    setEndLocText("Curzon Building");
  });

  const data = [
    {
      transportModes: ["walking", "train", "bus", "walking"],
      journeyTime: "28 mins",
    },
    {
      transportModes: ["bus", "train", "bus", "walking"],
      journeyTime: "29 mins",
    },
    {
      transportModes: ["walking", "train", "walking"],
      journeyTime: "32 mins",
    },
    {
      transportModes: ["walking", "bus", "walking", "bus", "walking"],
      journeyTime: "41 mins",
    },
  ];

  return (
    <View style={rootStyles.rootContainer}>
      <View style={Header.container}>
        <TextString textStyle={Header.text}>Go Somewhere</TextString>
      </View>
      <View style={textBoxStyles.container}>
        <TextInputBox
          editable={false}
          placeholder={startLocText}
          contentType={"none"}
          keyboardType={"default"}
          inputStyle={{ backgroundColor: "#E8E8E8" }}
        ></TextInputBox>
        <TextInputBox
          editable={false}
          placeholder={endLocText}
          contentType={"none"}
          keyboardType={"default"}
          inputStyle={{ backgroundColor: "#E8E8E8" }}
        ></TextInputBox>
      </View>
      <View style={journeyGroupStyles.container}>
        <FlatList
          data={data}
          renderItem={(itemData) => (
            <View style={journeyGroupStyles.journeyCard}>
              <JourneyCard
                transportModes={itemData.item.transportModes}
                journeyTime={itemData.item.journeyTime}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default JourneyResultScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryGrey,
  },
});

const textBoxStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "18%",
    width: "80%",
    height: "13%",
    justifyContent: "space-between",
  },
});

const journeyGroupStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "35%",
    width: "80%",
  },
  journeyCard: {
    marginVertical: "5%",
  },
});
