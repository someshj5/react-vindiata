import fetch from "isomorphic-unfetch";

export const baseURL = "http://localhost:8000";

export const getHeaders = (accessToken) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = accessToken;
  }

  return headers;
};

const tryJson = async (res) => {
  try {
    return await res.json();
  } catch (_error) {
    return undefined;
  }
};

export const fetchPost = async (url, data, accessToken) => {
  return await fetch(url, {
    method: "POST",
    headers: getHeaders(accessToken),
    body: JSON.stringify(data),
  })
    .then(async (resp) => {
      if (!resp.ok) {
        const body = await tryJson(resp);

        throw new Error(body ? body.detail : "Something went wrong");
      }
      return await resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchGet = async (url) => {
  return await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(async (resp) => {
      if (!resp.ok) {
        const body = await tryJson(resp);
        throw new Error(body ? body.detail : "Something went wrong");
      }
      return await resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
