import { catchErr } from "../utils/errors";
import axios from "axios";

// get makes a GET request to the given url
export async function get(url, headers) {
  console.log(`Making a GET request to url: ${url} with headers: ${headers}`);

  const response = {
    data: null,
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.get(url, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
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

// post makes a POST request to the given url
export async function post(url, headers, body) {
  console.log(
    `Making a POST request to url: ${url} with headers: ${headers} and body: ${body}`
  );

  const response = {
    data: null,
    serverError: null,
  };

  body = body ? body : null;

  let [err, resp] = await catchErr(
    axios.post(url, body, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
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

// put makes a PUT request to the given url
export async function put(url, headers, body) {
  console.log(
    `Making a PUT request to url: ${url} with headers: ${headers} and body: ${body}`
  );
  const response = {
    data: null,
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.put(url, body, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
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

// del makes a DELETE request to the given url
export async function del(url, headers) {
  console.log(
    `Making a DELETE request to url: ${url} with headers: ${headers}`
  );
  const response = {
    serverError: null,
  };

  let [err, resp] = await catchErr(
    axios.delete(url, {
      validateStatus: function (status) {
        return status < 500;
      },
      headers,
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
