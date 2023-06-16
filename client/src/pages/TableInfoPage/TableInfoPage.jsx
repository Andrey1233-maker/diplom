import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { defaultButtonTypes } from "../../consts";

import { playerFromTableReducerSelector, tableFromTableInfoReducerSelector } from './../../redux/reducers/selectors'

import styles from './TableInfoPage.module.css'
import PlayerBlock from '../../components/PlayerBlock/PlayerBlock'
import { DefaultButton, DefaultInput } from '../../components'
import { requestDeletePlayerActionCreator, requestPostAddUserToTableActionCreator, requestPostPlayerRoleActionCreator } from '../../redux/actions/actionCreators';


export default function TableInfoPage() {

    const table = useSelector(tableFromTableInfoReducerSelector)
    const player = useSelector(playerFromTableReducerSelector)

    const dispatch = useDispatch()

    const [ newPlayerEmail, setNewPlayerEmail ] = useState('')
    const [ openRoleForm, setOpenRoleForm ] = useState(null)

    const onClickDeleteUser = useCallback((id) => {
        if(table) {
            dispatch(requestDeletePlayerActionCreator(id, table.id))
        }
    }, [dispatch, table])

    const onClickInviteUser = useCallback(() => {
        dispatch(requestPostAddUserToTableActionCreator(table.id, newPlayerEmail))
        setNewPlayerEmail('')
    }, [setNewPlayerEmail, dispatch, newPlayerEmail])

    const onClickRoleBtn = useCallback((cplayer) => {
        setOpenRoleForm(cplayer)
    }, [setOpenRoleForm])

    const onClickRoleBtn2 = useCallback((role) => {
        if(table && openRoleForm) {
            dispatch(requestPostPlayerRoleActionCreator(openRoleForm.id, role, table.id))
        }
        setOpenRoleForm(null)
    }, [dispatch, openRoleForm, table])

    useEffect(() => {
        console.log(table, player)
    }, [player, table])

    if(!table) {
        return (<div className={styles.page}>
            <p className={styles.page__title}>Комната не найдена</p>
        </div>)
    }

    
    return (
        <div className={styles.page}>
            <p className={styles.page__title}>{table.title}</p>
            <p className={styles.page__desc}>{table.description}</p>

            <p className={styles.page__title}>Список игроков</p>
            <div className={styles.page__player_list}>
                {table.players.map((playerC) => 
                    (<PlayerBlock player={playerC} isAdmin={player?.role === 2} onClickRole={onClickRoleBtn} onClickDeleteUser={onClickDeleteUser}/>)
                )}
                {(player?.role === 2) && (
                    <div className={styles.add_user_block}>
                        <p>Почта пользователя: </p>
                        <DefaultInput title={'Почта нового игрока'} value={newPlayerEmail} onChange={setNewPlayerEmail}/>
                        <DefaultButton title={'Пригласить'} type={defaultButtonTypes.ACCEPT} onClick={onClickInviteUser}/>
                    </div>
                )}
            </div>
            {
                openRoleForm && (
                    <div className={styles.form_wrapper}>
                        <div className={styles.form}>
                            <p>Роль для пользователя <strong>{openRoleForm.user.name}</strong></p>
                            <div className={styles.form__btns}>
                                <DefaultButton title={'Админ'} type={defaultButtonTypes.ACCEPT} onClick={() => onClickRoleBtn2(2)}/>
                                <DefaultButton title={'Банкир'} type={defaultButtonTypes.ACCEPT} onClick={() => onClickRoleBtn2(1)}/>
                                <DefaultButton title={'Игрок'} type={defaultButtonTypes.ACCEPT} onClick={() => onClickRoleBtn2(0)}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}       