import api from "../../apiConfig"
import { tableWithIdQueryCreator } from "../../apiCreator"


export default async function getTableByIdRequest(action) {
    try {
        const response = (await api.get(tableWithIdQueryCreator(action.id))).data
        if('table' in response) {
            return response
        }

        throw new Error(response)
    }
    catch(e) {
        throw new Error(`getTableByIdRequest: request failed ~ ${e}`)
    }
}