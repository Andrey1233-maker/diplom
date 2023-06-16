import { TABLE_PATH, api } from "../../";

export default async function getTablesRequest() {
  try {
    const response = (await api.get(TABLE_PATH)).data;
    if ("message" in response) {
      throw new Error(`getTablesRequest: request failed ¬ ${response.message}`);
    }
    return response;
  } catch (e) {
    throw e;
  }
}
