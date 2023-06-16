import { useCallback } from 'react'
import { getRoleByEmun, getProfilePictureByUser } from './../../utils'

import styles from './PlayerBlock.module.css'
import { useDispatch } from 'react-redux'

import userImg from '../../imgs/user.png'
import closeIcon from '../../imgs/X.svg'

export default function PlayerBlock({ player, isAdmin, onClickRole, onClickDeleteUser }) {

    const dispath = useDispatch()

    const onClickDeletePlayer = useCallback(() => {
        onClickDeleteUser(player.id)
    }, [player, onClickDeleteUser])

    const onClickRolePlayer = useCallback(() => {
        onClickRole(player)
    }, [])

    return (
        <div className={styles.player_block}>
            <div className={styles.player_info}>
                <img src={getProfilePictureByUser(player.user)} className={styles.player_block__user_pic}/>
                <div className={styles.player_block__user_info}>
                    <p className={styles.user_info__name}>{player.user.name}</p>
                    <p className={styles.user_info__role}>{player.user.email}</p>
                    <p className={styles.user_info__role}>{getRoleByEmun(player.role)}</p>
                </div>
            </div>
            {isAdmin && (
                <div className={styles.functions}>
                    <img src={userImg} className={styles.player_block__img} onClick={onClickRolePlayer}/>
                    <img src={closeIcon} className={styles.player_block__img} onClick={onClickDeletePlayer}/>
                </div>
            )}
        </div>
    )
}