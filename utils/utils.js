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

export function IsValidEmail(emailAddress) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function IsValidPassword(password) {
  const MIN_PASSWORD_LENGTH = 6;
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function BuildUrl(baseUrl, sub, id) {
  if (id !== undefined) {
    return baseUrl + sub + id;
  }
  return baseUrl + sub;
}
