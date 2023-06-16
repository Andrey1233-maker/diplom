import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getColorByStyleCard } from '../../utils'

import {CardBlock, DefaultButton, DefaultInput } from '../../components'
import styles from './TableCardsPage.module.css'
import { walletsFromTableReducerSelector } from '../../redux/reducers/selectors'
import { requestDeleteWalletActionCreator, requestGetWalletsActionCreator, requestPostWalletActionCreator } from '../../redux/actions/actionCreators'
import { playerFromTableReducerSelector } from '../../redux/reducers/selectors'

import close_icon from './X.svg'
import { useNavigate } from 'react-router-dom'


export default function TableCardsPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newCard, setNewCard] = useState({ style: 0, number: '1234'})

    const player = useSelector(playerFromTableReducerSelector)

    const onChangeNumber = useCallback((number) => {
        setNewCard({...newCard, number })
    }, [setNewCard, newCard])

    const onChangeNewStyle = useCallback((style) => {
        setNewCard({...newCard, style})
    }, [setNewCard, newCard])

    const onClickCreateCard = useCallback(() => {
        if(player) {
            dispatch(requestPostWalletActionCreator(0, player.id, newCard.number, newCard.style))
        }
    }, [dispatch, newCard, player])

    const cards = useSelector(walletsFromTableReducerSelector)

    const onClickDeleteCard = useCallback((walletId) => {
        dispatch(requestDeleteWalletActionCreator(walletId, player.id))
    }, [dispatch, player])

    const onCLickCard = useCallback((id) => {
        navigate(`${id}`)
    }, [navigate])

    useEffect(() => {
        if(player) {
            dispatch(requestGetWalletsActionCreator(player.id))
        }
    }, [player, dispatch])

    return (
        <div className={styles.page}>
            <p className={styles.page__title}>Ваши кошельки</p>
            <div className={styles.page__dual_section}>
                <div className={styles.dual_section__cards_list}>
                    {cards?.map((card) => (
                        <div className={styles.card_item} onClick={() => onCLickCard(card.id)}>
                            <CardBlock card={card}/>
                            <div className={styles.card_item__info}>
                                <p className={styles.info__number}>Номер кошелька: {card.number}</p>
                                <p className={styles.info__balance}>Баланс на кошельке: {card.balance}</p>
                            </div>
                            <img src={close_icon} onClick={() => onClickDeleteCard(card.id)}/>
                        </div>
                    )) ?? 'У вас нет карт, создайте'}
                </div>
                <div className={styles.dual_section__wall}/>
                <div className={styles.dual_section__create_card}>
                    <p className={styles.page__title}>Создать кошелёк</p>
                    <CardBlock card={newCard}/>
                    <DefaultInput title={'Номер карты'} value={newCard.number} onChange={onChangeNumber}/>
                    <div className={styles.create_card__style_selector}>
                        <div style={{background: getColorByStyleCard(1)}} className={classnames(styles.style_selector__option, {
                            [styles.style_selector__option_target]: newCard.style === 1
                        })}
                        onClick={() => onChangeNewStyle(1)}/>
                        <div  style={{background: getColorByStyleCard(2)}} className={classnames(styles.style_selector__option, {
                            [styles.style_selector__option_target]: newCard.style === 2
                        })}
                        onClick={() => onChangeNewStyle(2)}/>
                        <div  style={{background: getColorByStyleCard(3)}} className={classnames(styles.style_selector__option, {
                            [styles.style_selector__option_target]: newCard.style === 3
                        })}
                        onClick={() => onChangeNewStyle(3)}/>
                        <div  style={{background: getColorByStyleCard(4)}} className={classnames(styles.style_selector__option, {
                            [styles.style_selector__option_target]: newCard.style === 4
                        })}
                        onClick={() => onChangeNewStyle(4)}/>
                        <div  style={{background: getColorByStyleCard(5)}} className={classnames(styles.style_selector__option, {
                            [styles.style_selector__option_target]: newCard.style === 5
                        })}
                        onClick={() => onChangeNewStyle(5)}/>  
                    </div>
                    <DefaultButton title={'Создать кошелёк'} onClick={onClickCreateCard}/>
                </div>
            </div>
        </div>
    )
}