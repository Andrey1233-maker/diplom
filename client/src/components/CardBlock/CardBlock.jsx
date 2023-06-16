import styles from './CardBlock.module.css'
import { getColorByStyleCard } from '../../utils'

export default function CardBlock({ card }) {

    return (
        <div className={styles.card} style={{background: getColorByStyleCard(card.style)}}>
            <div className={styles.card__number}>
                {card.number}
            </div>
        </div>
    )
}