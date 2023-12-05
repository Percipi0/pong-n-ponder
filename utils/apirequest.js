/* Uncomment this line to point requests at your local server. */
API_URL = "http://10.31.11.154:1930";

/* Subclass of Error for representing HTTP errors returned from the API.
   Exposes a status (the HTTP response status code) and message (a user-facing message).

   Example usage:
      throw new HTTPError(500, "This feature is not implemented"); */
export class HTTPError extends Error {
  /* status is the HTTP status, message is a user-facing error message. */
  constructor(status, message) {
    /* Call the Error constructor with the given message. */
    super(message);
    this.status = status;
  }
}

/* Make an API request.
   - method is the HTTP method.
   - path is the URI. It must begin with a /. Does not include API_URL.
   - body (optional) is the request body as a JS object that can be converted to JSON.

   The API is assumed to return JSON. If the response status is 200, the response body (as a JS object) is returned.
   If the response has any other status, an HTTPError is thrown, with its status set to the response status and its
   message set to the value of the `error` property of the response, which we assume is a user-facing error message. */
const apiRequest = async (method, path, body = null) => {
  let response;
  if (method === "GET") {
    response = await fetch(API_URL + path);
  } else if (body != null) {
    response = await fetch(API_URL + path, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(API_URL + path, {
      method: method,
      headers: { "Content-Type": "application/json" },
    });
  }

  let text = await response.text();

  if (response.status === 200) {
    return JSON.parse(text);
  } else {
    let err = new HTTPError(response.status, JSON.parse(text)["error"]);
    throw err;
  }
};

export default apiRequest;
