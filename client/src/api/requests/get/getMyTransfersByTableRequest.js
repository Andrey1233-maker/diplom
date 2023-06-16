import api from "../../apiConfig"
import { transferWithTableAndPlayerQueryCreator } from "../../apiCreator"


export default async function getMyTransfersByTableRequest(action) {
    try {
        const response = (await api.get(transferWithTableAndPlayerQueryCreator(action.tableId, action.playerId))).data
        return response
    }
    catch(e) {
        throw new Error(`getMyTransfersByTableRequest: invalid request ~ ${e}`)
    }
}