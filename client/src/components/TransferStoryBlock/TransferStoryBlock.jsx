import { useMemo } from 'react'
import classnames from 'classnames'

import MiniCardBlock from '../MiniCardBlock';
import styles from './TransferStoryBlock.module.css'


export default function TransferStoryBlock({ transfer, player }) {

  const { sender, recipient, sum, color } = useMemo(() => {
    if(player.id === transfer.currencySender?.player.id && player.id === transfer.currencyRecipier?.player.id) {
      return {
        sender: transfer.currencySender,
        recipient: transfer.currencyRecipier,
        sum: `>>> -${transfer.sum} >>>`,
        color: '#000',
      }
    }
    if(player.id === transfer.currencySender?.player.id) {
      return {
        sender: transfer.currencySender,
        recipient: transfer.currencyRecipier,
        sum: `>>> -${transfer.sum} >>>`,
        color: '#b93333',
      }
    }
    if(player.id === transfer.currencyRecipier?.player.id) {
      return {
        sender: transfer.currencyRecipier,
        recipient: transfer.currencySender,
        sum: `<<< +${transfer.sum} <<<`,
        color: '#00cd33',
      }
    }
  }, [player, transfer])

  return (
    <div className={classnames(styles.transfer_block, {
      [styles.transfer_block_pos]: !(player.id === transfer.currencySender?.player.id),
      [styles.transfer_block_neg]: player.id === transfer.currencySender?.player.id && !(player.id === transfer.currencyRecipier?.player.id),})}>
      {sender ? (<div className={styles.card_section}>
        <MiniCardBlock card={sender}/>
        <p className={styles.card_section__user_name}>{sender.player.user.name}</p>
      </div>) : 'Банк'}
      <p className={styles.transfer_block__sum} style={{color}}>{sum}</p>
      {recipient ? (<div className={styles.card_section}>
        <p className={styles.card_section__user_name}>{recipient.player.user.name}</p>
        <MiniCardBlock card={recipient}/>
      </div>) : 'Банк' }
    </div>
  );
}
