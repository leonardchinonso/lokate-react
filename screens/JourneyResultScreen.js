import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Header } from "../styles/text";
import TextString from "../components/ui/TextString";
import Colors from "../styles/colors";
import TextInputBox from "../components/ui/TextInputBox";
import { useContext, useEffect, useState } from "react";
import JourneyCard from "../components/ui/JourneyCard";
import { RouteContext } from "../store/context/RouteContext";

function JourneyResultScreen() {
  const routeContext = useContext(RouteContext);

  const [startLocText, setStartLocText] = useState("");
  const [endLocText, setEndLocText] = useState("");

  useEffect(() => {
    const startLocation = routeContext.startLocation;
    const endLocation = routeContext.endLocation;

    setStartLocText(startLocation.name);
    setEndLocText(endLocation.name);
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={rootStyles.rootContainer}>
        <View style={textBoxStyles.container}>
          <TextInputBox
            editable={false}
            placeholder={startLocText}
            contentType={"none"}
            keyboardType={"default"}
            inputStyle={{ backgroundColor: Colors.almostWhite }}
            containerStyle={{ marginTop: "20%", marginBottom: "3%" }}
          ></TextInputBox>
          <TextInputBox
            editable={false}
            placeholder={endLocText}
            contentType={"none"}
            keyboardType={"default"}
            inputStyle={{ backgroundColor: Colors.almostWhite }}
          ></TextInputBox>
        </View>
        <View>
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
    </SafeAreaView>
  );
}

export default JourneyResultScreen;

const rootStyles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 14,
    backgroundColor: Colors.primaryWhite,
  },
});

const textBoxStyles = StyleSheet.create({
  container: {
    marginBottom: "20%",
  },
});

const journeyGroupStyles = StyleSheet.create({
  journeyCard: {
    marginVertical: "4%",
  },
});
