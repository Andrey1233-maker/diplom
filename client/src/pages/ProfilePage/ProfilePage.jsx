import { useSelector } from "react-redux";
import { getProfilePictureByUser } from '../../utils'
import { userFromuserReducerSelector } from "../../redux/reducers/selectors";

import styles from './ProfilePage.module.css'


export default function ProfilePage() {

    const user = useSelector(userFromuserReducerSelector);

    return (
    <div className={styles.content}>
        <img src={getProfilePictureByUser(user)} className={styles.content__photo} alt='photo'/>
        <div className={styles.content__user_info}>
            <h1 className={styles.user_info__text}>О пользователе</h1>
            <p className={styles.user_info__text}><strong>Имя:</strong> {user.name}</p>
            <p className={styles.user_info__text}><strong>Почта:</strong> {user.email}</p>
        </div>
    </div>)
}   