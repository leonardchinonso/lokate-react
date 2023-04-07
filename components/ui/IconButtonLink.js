import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/colors";
import {
  HomepageDestinationConstants,
  ProfileConstants,
} from "../../models/constants";

function IconButtonLink({ name, children }) {
  function getIconPath(name) {
    switch (name) {
      case HomepageDestinationConstants.GoSomewhere:
        return require("../../assets/images/navigator_icon.png");
      case HomepageDestinationConstants.GoHome:
        return require("../../assets/images/home_icon.png");
      case HomepageDestinationConstants.GoToWork:
        return require("../../assets/images/work_icon.png");
      case HomepageDestinationConstants.SavedPlaces:
        return require("../../assets/images/pin_icon.png");
      case HomepageDestinationConstants.CurrentLocation:
        return require("../../assets/images/current_location_icon.png");
      case HomepageDestinationConstants.Location:
        return require("../../assets/images/location_icon.png");
      case ProfileConstants.EditProfile:
        return require("../../assets/images/edit_icon_2.png");
      case ProfileConstants.SavedPlaces:
        return require("../../assets/images/pin_icon.png");
      case ProfileConstants.Settings:
        return require("../../assets/images/settings_icon.png");
      case ProfileConstants.ContactUs:
        return require("../../assets/images/phone_icon.png");
      case ProfileConstants.About:
        return require("../../assets/images/paper_icon.png");
      case ProfileConstants.Logout:
        return require("../../assets/images/exit_icon.png");
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

export default IconButtonLink;

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
