
import { useDispatch, useSelector } from 'react-redux';
import { DefaultInput, TransferStoryBlock } from '../../components'

import styles from "./TableTransferStoryPage.module.css";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { selectorForTransferStoryPage } from '../../redux/reducers/selectors'
import { requestMyTransfersActionCreator } from '../../redux/actions/actionCreators';

export default function TableFragmentTransferStoryPage() {

  const dispatch = useDispatch()
  const { table, player, transfers } = useSelector(selectorForTransferStoryPage)

  const [searchValue, setSearchValue] = useState('')
  const [searchType, setSearchType] = useState(1)

  const onChangeType = useCallback(({target}) => {
    setSearchType(target.value)
  }, [setSearchType])

  const transfesIsInType = useCallback((transfer) => {
    if(searchType == 1) { return true }
    if(searchType == 2) { if(transfer.currencySender?.player.id !== player.id) { return true }}
    if(searchType == 3) { if(transfer.currencyRecipier?.player.id !== player.id) { return true }}
    if(searchType == 4) { if(transfer.currencyRecipier?.player.id === player.id && transfer.currencySender?.player.id === player.id) {return true}}
    return false
  }, [searchType, player])

  useEffect(() => {
    if(table && player) {
      dispatch(requestMyTransfersActionCreator(table.id, player.id))
    }
  }, [table, player, dispatch])

  const sortedTransfersAndFiltered = useMemo(() => transfers && transfers.filter((transfer) => (
    (transfer.currencySender?.number.indexOf(searchValue) >= 0 || 
    transfer.currencyRecipier?.number.indexOf(searchValue) >= 0 ||
    transfer.currencySender?.player.user.name.indexOf(searchValue) >= 0 ||
    transfer.currencyRecipier?.player.user.name.indexOf(searchValue) >= 0) 
    && transfesIsInType(transfer)
  )).sort((transferA, transferB) => {
    if(Number(transferA.id) > Number(transferB.id)) {
      return -1
    }
    return 1
  }),[transfers, searchValue,  transfesIsInType])

  return (
    <div className={styles.table_page__form}>
      <p className={styles.table_page__title}>История переводов</p>
      <div className={styles.filter_bar}>
      <DefaultInput onChange={setSearchValue} value={searchValue}/>
        <select onChange={onChangeType} value={searchType}>
          <option value={1}>Все</option>
          <option value={2}>Доход</option>
          <option value={3}>Убытки</option>
          <option value={4}>Между своими</option>
        </select>
      </div>
      <div className={styles.table_page__list}>
        {
          (sortedTransfersAndFiltered?.length > 0) ? (sortedTransfersAndFiltered.map(transfer => (
            <TransferStoryBlock transfer={transfer} player={player}/>
          ))) :
          (<p>Не было операций с вашими счетами</p>)
        }
      </div>
    </div>
  );
}
