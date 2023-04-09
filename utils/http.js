import axios from "axios";

export function loginSample() {
  console.log("Logging In");
  // axios
  //   .post("http://localhost:8080/v1/auth/login", {
  //     email: "leonard13@gmail.com",
  //     password: "password",
  //   })
  //   .then((r) => {
  //     console.log(r);
  //   });

  axios
    .post("http://192.168.0.144:8080/v1/auth/login", {
      email: "leonard13@gmail.com",
      password: "password",
    })
    .then((r) => {
      console.log("Response: ", r);
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log("DATA: ", error.response.data);
        console.log("STATUS: ", error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("NO RESPONSE");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("SOMETHING ELSE");
        console.log("Error", error.message);
      }
    });
}
