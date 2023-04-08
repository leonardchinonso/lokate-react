export function GetMinutesFromColonTimeFormat(time) {
  let arr = time.split(":");
  return arr[1];
}

export function GetTimeInMeridian(time) {
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
