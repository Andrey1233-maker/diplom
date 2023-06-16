import api from "../../apiConfig"
import { walletWithIdQueryCreator } from "../../apiCreator"


export default async function deleteWalletRequest(action) {
    try {
        const response = (await api.delete(walletWithIdQueryCreator(action.id))).data
        if(response.error) {
            throw new Error(`deleteWalletRequest: request failed`)
        }
    }
    catch(e) {
        throw new Error(e)
    }
}