import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { playerFromTableReducerSelector, walletsFromTableReducerSelector, tableFromTableInfoReducerSelector } from '../../redux/reducers/selectors'
import { DefaultButton, DefaultInput } from '../../components'
import MiniCardBlock from '../../components/MiniCardBlock'
import { defaultButtonTypes } from '../../consts'

import { requestGetWalletsActionCreator, requestCreateTransferActionCreator } from '../../redux/actions/actionCreators'
import styles from './TableTransferPage.module.css'

export default function TableTransferPage() {

    const player = useSelector(playerFromTableReducerSelector)
    const cards = useSelector(walletsFromTableReducerSelector)
    const table = useSelector(tableFromTableInfoReducerSelector)

    const [transferConf, setTransferConf] = useState({
        sender: null,
        recipient: null,
        sum: 0,
    })

    const dispatch = useDispatch()

    const onCLickCreateTransfer = useCallback(() => {
        console.log()
        console.log(table && player && transferConf.sender && transferConf.recipient && Number(transferConf.sum) > 0 )
        if(table && player && transferConf.sender && transferConf.recipient && Number(transferConf.sum) > 0) {
            dispatch(requestCreateTransferActionCreator(table.id, player.id, Number(transferConf.sum), transferConf.sender, transferConf.recipient))
        }
    }, [table, player, dispatch, transferConf])

    const onChangeSum = useCallback((value) => {
        setTransferConf(prev => ({...prev, sum: Number(value)}))
    }, [setTransferConf])

    const onChangeSender = useCallback((wallet) => {
        setTransferConf(prev => ({...prev, sender: wallet}))
    }, [setTransferConf])

    const onChangeRecipient = useCallback((wallet) => {
        console.log(wallet)
        setTransferConf(prev => ({...prev, recipient: wallet}))
    }, [setTransferConf])

    useEffect(() => {
        if(player) {
            dispatch(requestGetWalletsActionCreator(player.id))
        }
    }, [player, dispatch])

    return (
        <div className={styles.page}>
            <p className={styles.page__title}>Совершить перевод</p>
            <div className={styles.page__transaction_steps}>
                
                <div className={styles.transaction_steps__my_cards}>  
                <p className={styles.page__title1}>Выберете вашу карту</p>
                    {cards.map((card) => (
                        <div className={`${styles.card_item} ${transferConf.sender === card.id && styles.card_item_focus}`} onClick={() => onChangeSender(card.id)}>
                            <MiniCardBlock card={card}/>
                            <p>Баланс: {card.balance}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.dual_section__wall}/>
                <div className={styles.transaction_steps__my_cards}>
                <p className={styles.page__title1}>Выберете куда переводить</p>
                    <div className={`${styles.card_item} ${transferConf.recipient === -1 && styles.card_item_focus}`} onClick={() => onChangeRecipient(-1)}>
                        Банк
                    </div>
                    {
                        table && table.players.map(player => player.currencies?.map(card => (
                        <div className={`${styles.card_item} ${transferConf.recipient === card.id && styles.card_item_focus}`} onClick={() => onChangeRecipient(card.id)}>
                            <MiniCardBlock card={card}/>
                            <p>{player.user.name}</p>
                        </div>
                        )))
                    }
                </div>
                <div className={styles.dual_section__wall}/>

                <div className={styles.transaction_steps__transfer_sum}>
                    <p className={styles.page__title1}>Сумма перевода</p>
                    <DefaultInput value={transferConf.sum} title={'Сумма перевода'} onChange={onChangeSum}/>
                    <DefaultButton title={'Совершить перевод'} type={defaultButtonTypes.ACCEPT} onClick={onCLickCreateTransfer}/>
                </div>
            </div>
        </div>
    )
}