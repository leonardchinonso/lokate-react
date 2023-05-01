/**
 * This file holds the implementation for utility functions
 * */

import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "../styles/colors";

// getTimeInMeridian gets time in meridian from a time string
export function getTimeInMeridian(time) {
  let hours = time.split(":")[0];
  let minutes = time.split(":")[1];
  let meridian = "AM";

  let hoursInt = parseInt(hours);
  if (hoursInt > 12) {
    meridian = "PM";
  }

  hoursInt %= 12;

  return hoursInt.toString(10) + ":" + minutes + meridian;
}

// isValidEmail returns true if an email is valid and false otherwise
export function isValidEmail(emailAddress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

// isValidPassword returns true if a password is valid and false otherwise
export function isValidPassword(password) {
  const MIN_PASSWORD_LENGTH = 6;
  return password.length >= MIN_PASSWORD_LENGTH;
}

// buildUrl builds url from a base url, path url and params
export function buildUrl(baseUrl, sub, id) {
  if (id !== undefined) {
    return baseUrl + sub + id;
  }
  return baseUrl + sub;
}

// getHoursAndMinutes returns the time string in hours and  minutes
export function getHoursAndMinutes(time) {
  // split the time string by the colon
  let hours = time.split(":")[0];
  let minutes = time.split(":")[1];

  // convert the hours and minutes to integers
  let hoursInt = parseInt(hours);
  let minsInt = parseInt(minutes);

  // if the hour component exists, render it in hours and minutes
  if (hoursInt > 0) {
    return `${hoursInt} hr ${minsInt} mins`;
  }

  return `${minsInt} mins`;
}

// getIcon returns a JSX icon depending on the string passed in
export function getIcon(type) {
  switch (type) {
    case "train_station":
      return (
        <FontAwesome5 name="train" size={24} color={Colors.primaryWhite} />
      );
    case "settlement":
      return <FontAwesome name="home" size={24} color={Colors.primaryWhite} />;
    case "bus_stop":
      return (
        <FontAwesome5 name="bus-alt" size={24} color={Colors.primaryWhite} />
      );
    case "street":
      return <FontAwesome5 name="road" size={24} color={Colors.primaryWhite} />;
    case "tram_stop":
      return <FontAwesome5 name="tram" size={24} color={Colors.primaryWhite} />;
    case "tube_station":
      return <Fontisto name="subway" size={24} color={Colors.primaryWhite} />;
    case "HOME":
      return (
        <Ionicons name="home-outline" size={24} color={Colors.primaryWhite} />
      );
    case "WORK":
      return (
        <Ionicons
          name="briefcase-outline"
          size={24}
          color={Colors.primaryWhite}
        />
      );
    case "NONE":
      return <Entypo name="location" size={24} color={Colors.primaryWhite} />;
    default:
      return (
        <MaterialIcons name="place" size={24} color={Colors.primaryWhite} />
      );
  }
}
