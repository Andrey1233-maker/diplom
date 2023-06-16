
import { getColorByStyleCard } from '../../utils'
import styles from './MiniCardBlock.module.css'

export default function MiniCardBlock({ card }) {

    return (
        <div className={styles.block} style={{background: getColorByStyleCard(card.style)}}>
            <p className={styles.block__number_card}>{card.number}</p>
        </div>
    )
}