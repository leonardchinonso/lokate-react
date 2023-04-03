import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";
import Constants from "../../models/constants";

function HomepageDestinationButtonLink({ name, children }) {
  function getIconPath(name) {
    switch (name) {
      case Constants.GoSomewhere:
        return require("../../assets/images/navigator_icon.png");
      case Constants.GoHome:
        return require("../../assets/images/home_icon.png");
      case Constants.GoToWork:
        return require("../../assets/images/work_icon.png");
      case Constants.SavedPlaces:
        return require("../../assets/images/pin_icon.png");
      case Constants.CurrentLocation:
        return require("../../assets/images/current_location_icon.png");
      case Constants.Location:
        return require("../../assets/images/location_icon.png");
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={getIconPath(name)} />
      </View>
      <Pressable style={({ pressed }) => (pressed ? styles.pressed : null)}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default HomepageDestinationButtonLink;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageContainer: {
    width: "11%",
    height: "100%",
    marginRight: "5%",
  },
  buttonText: {
    color: Colors.primaryDarkBlue,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 25,
  },
  pressed: {
    opacity: 0.5,
  },
});
