import api from "../../apiConfig"
import { transferWithTableQueryCreator } from "../../apiCreator"


export default async function getAllTransfersByTableRequest(action) {
    try {
        const response = (await api.get(transferWithTableQueryCreator(action.tableId))).data
        return response
    }
    catch(e) {
        throw new Error(`getAllTransfersByTableRequest: invalid request ~ ${e}`)
    }
}