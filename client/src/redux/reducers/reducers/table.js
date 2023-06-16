import { SET_ALL_TRANSFERS_TO_REDUX_ACTION, SET_WALLET_AND_TRANSFERS_TO_REDUCER_ACTION, SET_MY_TRANSFERS_TO_REDUX_ACTION, SET_SELECTED_TABLE_TO_TABLE_REDUCER_ACTION, SET_WALLETS_TO_REDUCER_ACTION } from './../../actions/actionTypes'

const initial = {
    table: null,
    player: null,
    wallets: [],
    allTransfers: [],
    myTransfers: [],
    walletView: null,
    walletViewTransfers: [],
}

export default function tableInfoReducer(state = initial, action) {
    switch(action.type) {
        case SET_SELECTED_TABLE_TO_TABLE_REDUCER_ACTION:
            return { ...state, table: action.table, player: action.player };
        case SET_WALLETS_TO_REDUCER_ACTION:
            return { ...state, wallets: action.wallets };
        case SET_ALL_TRANSFERS_TO_REDUX_ACTION:
            return { ...state, allTransfers: action.transfers};
        case SET_MY_TRANSFERS_TO_REDUX_ACTION:
            return { ...state, myTransfers: action.transfers };
        case SET_WALLET_AND_TRANSFERS_TO_REDUCER_ACTION:
            return { ...state, walletView: action.wallet, walletViewTransfers: action.transfers}
        default:
            return state
    }
}