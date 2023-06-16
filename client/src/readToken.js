export function readToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  return localStorage.setItem("token", token);
}

export function deleteToken() {
  return localStorage.setItem("token", null);
}
