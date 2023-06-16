import api from "../../apiConfig"
import { playerWithIdQueryCreator } from "../../apiCreator"


export default async function deletePlayerRequest({ id }) {
    try {
        const response = (await api.delete(playerWithIdQueryCreator(id))).data
        return response
    }
    catch(e) {
        throw new Error(`deletePlayerRequest: request failed ~ ${e}`)
    }
}