import PickLocation from "./PickLocationScreen";
import { ScreenNameConstants } from "../models/constants";

function PickStartLocation({ navigation }) {
  function navigateToEndLocation() {
    navigation.navigate(ScreenNameConstants.PickEndLocationScreenName);
  }

  return <PickLocation position={"start"} onPress={navigateToEndLocation} />;
}

export default PickStartLocation;
