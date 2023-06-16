import api from "../../apiConfig"
import { walletWithTableIdQueryCreator } from "../../apiCreator"


export default async function getWalletsByTableRequest(action) {
    try  {
        const response = (await api.get(walletWithTableIdQueryCreator(action.id))).data
        if('wallets' in response) {
            return response.wallets
        }

        throw new Error(`getWalletsByTableRequest: request failed ~ ${response}`)
    }
    catch(e) {
        throw new Error(e)
    }
}