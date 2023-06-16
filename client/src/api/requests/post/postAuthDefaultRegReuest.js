import { AUTH_DEFAULT_REG_PATH, api } from "../../";

export default async function postAuthDefaultRegReuest(action) {
  try {
    const response = (await api.post(AUTH_DEFAULT_REG_PATH, action)).data;

    return response;
  } catch (e) {
    throw e;
  }
}
