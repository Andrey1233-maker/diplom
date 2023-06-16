import { WALLET_PATH } from '../../apiPath'
import api from './../../apiConfig'

export default async function postWallet(action) {
    try {
        const response = (await api.post(WALLET_PATH, action)).data
        if('wallet' in response) {
            return response.wallet
        }
        throw new Error(`postWallet: request failed`)
    }
    catch(e) {
        throw new Error(e)
    }
}