import api from "../../apiConfig"
import { tableWithIdAndUserEmailQueryCreator } from "../../apiCreator"


export default async function postInviteUserToTableRequest({userEmail, tableId}) {
    try {
        const response = (await api.post(tableWithIdAndUserEmailQueryCreator(tableId, userEmail))).data
        if(response.error) {
            throw new Error(response)
        }
        return response
    }
    catch(e) {
        throw new Error(`postInviteUserToTableRequest: request failed ~ ${e}`)
    }
}