import axios from "axios";
import { ServerUrlConstants } from "../models/constants";
import { BuildUrl } from "../utils/utils";
import { catchErr } from "../utils/errors";

export async function MakeLoginRequest(loginDetails) {
  const response = {
    data: null,
    serverError: null,
  };

  const url = BuildUrl(
    ServerUrlConstants.ServerBaseUrl,
    ServerUrlConstants.LoginUrl
  );

  let [err, resp] = await catchErr(
    axios.post(url, loginDetails, {
      validateStatus: function (status) {
        return status < 500;
      },
    })
  );

  if (err) {
    console.log("Error fetching request with url: ", url, ". Error: ", err);
    response.serverError = err;
    return response;
  }

  console.log("Request hit server successfully");
  response.data = resp.data;
  return response;
}
