import { TABLE_PATH, api } from "../..";
import { walletWithIdQueryCreator } from "../../apiCreator";

export default async function getWalletWithIdRequest(action) {
  try {
    const response = (await api.get(walletWithIdQueryCreator(action.id))).data;
    if ("message" in response) {
      throw new Error(`getWalletWithIdRequest: request failed ¬ ${response.message}`);
    }
    return response;
  } catch (e) {
    throw e;
  }
}
