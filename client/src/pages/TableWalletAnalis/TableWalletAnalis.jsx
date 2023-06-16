import { selectorForTransferStoryPage, selectorForWalletViewPage } from '../../redux/reducers/selectors'
import { useDispatch, useSelector } from 'react-redux';

import { useMemo, useEffect, useCallback } from 'react'
import { requestMyTransfersActionCreator, requestWalletActionCreator } from '../../redux/actions/actionCreators';
import {CardBlock, TransferStoryBlock } from '../../components'


import styles from './TableWalletAnalis.module.css'
import { useParams } from 'react-router-dom';


export default function TableWalletAnalis() {

    const dispatch = useDispatch()
    const { walletId } = useParams()
    const { wallet, player, transfers, table } = useSelector(selectorForWalletViewPage)

    const addSum = useCallback((transfer) => {
        if(transfer.currencySender?.id == wallet.id) {
            return -transfer.sum
        }
        return transfer.sum
    }, [wallet])

    useEffect(() => {
        console.log(walletId)
        if(walletId) {
          dispatch(requestWalletActionCreator(walletId))
        }
      }, [walletId, dispatch])

    const { sums, maxSum, sortedTransfers } = useMemo(() => {
        const sums = [0]
        let maxSum = 0
        const sortedTransfers = transfers.sort((t1, t2) => (t1.id > t2.id) ? 1 : -1) 
        sortedTransfers.forEach((transfer, index) => {
            sums.push(sums[index] + addSum(transfer))
        })
        sums.forEach((sum) => {if(sum > maxSum) { maxSum = sum }})
        return {
            sums,
            maxSum,
            sortedTransfers,
        }
    }, [transfers])

    return (
        <div className={styles.page}>
            <div className={styles.page_info}>
                <div className={styles.card_item}>
                    {wallet && <>
                        <CardBlock card={wallet}/>
                        <div className={styles.card_item__info}>
                            <p className={styles.info__number}>Номер кошелька: {wallet.number}</p>
                            <p className={styles.info__balance}>Баланс на кошельке: {wallet.balance}</p>
                        </div>
                    </>
                    }
                </div>
                <div className={styles.transfers}>
                    {(sortedTransfers && player) && sortedTransfers.map((transfer) => (
                        <TransferStoryBlock transfer={transfer} player={player}/>
                    ))}
                </div>
            </div>
            <div className={styles.grafic_wrapper}>
                <div className={styles.page_grafic}>
                    {
                        sums.map((sum, index) => (
                            <div className={styles.stick} style={{height: `${Number(sum) * 100 / Number(maxSum)}%`, background: sums[index - 1] > sum ? '#901111' : '#119019'}}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}