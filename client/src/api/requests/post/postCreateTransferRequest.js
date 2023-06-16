import api from "../../apiConfig"
import {  playerWithIdAndRoleQueryCreator, walletCreateTransferQueryCreator } from "../../apiCreator"


export default async function postCreateTransferRequest(action) {
    try {
        const response = (await api.post(walletCreateTransferQueryCreator(action.id), action)).data
        return response
    }
    catch(e) {
        throw new Error(`postCreateTransferRequest: request failed ~ ${e}`)
    }
}