import api from "../../apiConfig"
import {  playerWithIdAndRoleQueryCreator } from "../../apiCreator"


export default async function postPlayerRoleRequest(action) {
    try {
        const response = (await api.post( playerWithIdAndRoleQueryCreator(action.id), action)).data
        return response
    }
    catch(e) {
        throw new Error(`deletePlayerRequest: request failed ~ ${e}`)
    }
}