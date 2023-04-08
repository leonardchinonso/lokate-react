import { StyleSheet, View } from "react-native";
import Colors from "./styles/colors";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import { useEffect } from "react";
import SignupScreen from "./screens/SignupScreen";
import HomepageScreen from "./screens/HomepageScreen";
import PickStartLocationScreen from "./screens/PickStartLocationScreen";
import SavedPlacesScreen from "./screens/SavedPlacesScreen";
import EditPlaceScreen from "./screens/EditPlaceScreen";
import AddPlaceScreen from "./screens/AddPlaceScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PickEndLocationScreen from "./screens/PickEndLocationScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import AboutScreen from "./screens/AboutScreen";
import LogoutScreen from "./screens/LogoutScreen";
import JourneyResultScreen from "./screens/JourneyResultScreen";
import RouteResultScreen from "./screens/RouteResultScreen";

export default function App() {
  const routeResult = {
    routes: [
      {
        duration: "00:39:00",
        route_parts: [
          {
            mode: "walking",
            from_point_name: "Norfolk Road, Short Heath (Birmingham)",
            from_point: {
              place: null,
            },
            to_point_name: "Erdington, New Street",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:13:00",
            departure_time: "20:48",
            arrival_time: "21:01",
            departure_datetime: "2023-04-07T20:48:00+01:00",
            arrival_datetime: "2023-04-07T21:01:00+01:00",
            distance: 800,
            distance_desc: "870 yards",
          },
          {
            mode: "bus",
            from_point_name: "Erdington, New Street",
            from_point: {
              place: {
                type: "bus_stop",
                name: "New Street (Stop EC) - SW-bound",
                latitude: 52.52558,
                longitude: -1.83849,
                accuracy: 20,
                atcocode: "43000501402",
                description: "Erdington, Birmingham",
                smscode: "nwmdgpam",
              },
            },
            to_point_name: "Aston University, Coleshill Street",
            to_point: {
              place: {
                type: "bus_stop",
                name: "Coleshill Street - SE-bound",
                latitude: 52.48582,
                longitude: -1.88539,
                accuracy: 20,
                atcocode: "43000243002",
                description: "Aston University, Birmingham",
                smscode: "nwmamgmd",
              },
            },
            destination: "Birmingham",
            destination_point: {
              place: null,
            },
            line_name: "66",
            duration: "00:21:00",
            departure_time: "21:01",
            arrival_time: "21:22",
            departure_datetime: "2023-04-07T21:01:00+01:00",
            arrival_datetime: "2023-04-07T21:22:00+01:00",
            service: {
              id: null,
            },
            distance: 8064,
            distance_desc: "5.0 miles",
          },
          {
            mode: "walking",
            from_point_name: "Aston University, Coleshill Street",
            from_point: {
              place: null,
            },
            to_point_name: "Cardigan Street, Nechells",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:05:00",
            departure_time: "21:22",
            arrival_time: "21:27",
            departure_datetime: "2023-04-07T21:22:00+01:00",
            arrival_datetime: "2023-04-07T21:27:00+01:00",
            distance: 267,
            distance_desc: "290 yards",
          },
        ],
        departure_time: "20:48",
        arrival_time: "21:27",
        departure_datetime: "2023-04-07T20:48:00+01:00",
        arrival_datetime: "2023-04-07T21:27:00+01:00",
        distance: 9131,
        distance_desc: "5.7 miles",
      },
      {
        duration: "00:37:00",
        route_parts: [
          {
            mode: "walking",
            from_point_name: "Norfolk Road, Short Heath (Birmingham)",
            from_point: {
              place: null,
            },
            to_point_name: "Yenton, Edwards Road",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:12:00",
            departure_time: "20:50",
            arrival_time: "21:02",
            departure_datetime: "2023-04-07T20:50:00+01:00",
            arrival_datetime: "2023-04-07T21:02:00+01:00",
            distance: 733,
            distance_desc: "800 yards",
          },
          {
            mode: "bus",
            from_point_name: "Yenton, Edwards Road",
            from_point: {
              place: {
                type: "bus_stop",
                name: "Edwards Rd - S-bound",
                latitude: 52.5275,
                longitude: -1.83618,
                accuracy: 20,
                atcocode: "43000502901",
                description: "Yenton, Birmingham",
                smscode: "nwmdgpgd",
              },
            },
            to_point_name: "Aston University, Ryder Street",
            to_point: {
              place: {
                type: "bus_stop",
                name: "Ryder St (JW1) - S-bound",
                latitude: 52.48484,
                longitude: -1.89166,
                accuracy: 20,
                atcocode: "43000209105",
                description: "Aston University, Birmingham",
                smscode: "nwmajmam",
              },
            },
            destination: "Birmingham",
            destination_point: {
              place: null,
            },
            line_name: "X5",
            duration: "00:13:00",
            departure_time: "21:02",
            arrival_time: "21:15",
            departure_datetime: "2023-04-07T21:02:00+01:00",
            arrival_datetime: "2023-04-07T21:15:00+01:00",
            service: {
              id: null,
            },
            distance: 6543,
            distance_desc: "4.1 miles",
          },
          {
            mode: "walking",
            from_point_name: "Aston University, Ryder Street",
            from_point: {
              place: null,
            },
            to_point_name: "Cardigan Street, Nechells",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:12:00",
            departure_time: "21:15",
            arrival_time: "21:27",
            departure_datetime: "2023-04-07T21:15:00+01:00",
            arrival_datetime: "2023-04-07T21:27:00+01:00",
            distance: 776,
            distance_desc: "850 yards",
          },
        ],
        departure_time: "20:50",
        arrival_time: "21:27",
        departure_datetime: "2023-04-07T20:50:00+01:00",
        arrival_datetime: "2023-04-07T21:27:00+01:00",
        distance: 8052,
        distance_desc: "5.0 miles",
      },
      {
        duration: "00:36:00",
        route_parts: [
          {
            mode: "walking",
            from_point_name: "Norfolk Road, Short Heath (Birmingham)",
            from_point: {
              place: null,
            },
            to_point_name: "Yenton, Edwards Road",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:12:00",
            departure_time: "20:55",
            arrival_time: "21:07",
            departure_datetime: "2023-04-07T20:55:00+01:00",
            arrival_datetime: "2023-04-07T21:07:00+01:00",
            distance: 733,
            distance_desc: "800 yards",
          },
          {
            mode: "bus",
            from_point_name: "Yenton, Edwards Road",
            from_point: {
              place: {
                type: "bus_stop",
                name: "Edwards Rd - S-bound",
                latitude: 52.5275,
                longitude: -1.83618,
                accuracy: 20,
                atcocode: "43000502901",
                description: "Yenton, Birmingham",
                smscode: "nwmdgpgd",
              },
            },
            to_point_name: "Aston University, Ryder Street",
            to_point: {
              place: {
                type: "bus_stop",
                name: "Ryder St (JW1) - S-bound",
                latitude: 52.48484,
                longitude: -1.89166,
                accuracy: 20,
                atcocode: "43000209105",
                description: "Aston University, Birmingham",
                smscode: "nwmajmam",
              },
            },
            destination: "Birmingham",
            destination_point: {
              place: null,
            },
            line_name: "110",
            duration: "00:12:00",
            departure_time: "21:07",
            arrival_time: "21:20",
            departure_datetime: "2023-04-07T21:07:00+01:00",
            arrival_datetime: "2023-04-07T21:20:00+01:00",
            service: {
              id: null,
            },
            distance: 6543,
            distance_desc: "4.1 miles",
          },
          {
            mode: "walking",
            from_point_name: "Aston University, Ryder Street",
            from_point: {
              place: null,
            },
            to_point_name: "Cardigan Street, Nechells",
            to_point: {
              place: null,
            },
            destination: "",
            destination_point: {
              place: null,
            },
            line_name: "",
            duration: "00:12:00",
            departure_time: "21:20",
            arrival_time: "21:32",
            departure_datetime: "2023-04-07T21:20:00+01:00",
            arrival_datetime: "2023-04-07T21:32:00+01:00",
            distance: 776,
            distance_desc: "850 yards",
          },
        ],
        departure_time: "20:55",
        arrival_time: "21:32",
        departure_datetime: "2023-04-07T20:55:00+01:00",
        arrival_datetime: "2023-04-07T21:32:00+01:00",
        distance: 8052,
        distance_desc: "5.0 miles",
      },
    ],
  };

  return (
    <View style={styles.rootContainer}>
      {/*<SplashScreen />*/}
      {/*<LoginScreen />*/}
      {/*<SignupScreen />*/}
      {/*<HomepageScreen />*/}
      {/*<PickStartLocationScreen />*/}
      {/*<PickEndLocationScreen />*/}
      {/*<SavedPlacesScreen />*/}
      {/*<EditPlaceScreen />*/}
      {/*<AddPlaceScreen />*/}
      {/*<ProfileScreen />*/}
      {/*<EditProfileScreen />*/}
      {/*<SettingsScreen />*/}
      {/*<ContactUsScreen />*/}
      {/*<AboutScreen />*/}
      {/*<LogoutScreen />*/}
      {/*<JourneyResultScreen />*/}
      <RouteResultScreen routeData={routeResult.routes[2]} />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primaryLightBlue,
  },
});
