import { TABLE_PATH, api } from "../../";

export default async function postTableRequest(action) {
  try {
    const response = (await api.post(TABLE_PATH, action)).data;

    return response;
  } catch (e) {
    throw new Error(`postTableRequest: request failed ~ ${e}`);
  }
}
