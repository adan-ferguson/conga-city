import { writable, get } from 'svelte/store'
import type { UnitShopEntry } from '../../game/shop'
import type { SlotNumber } from '../../game/game'
import { gameInstance } from './gameInstanceStore'
import { buyUnit } from '../../game/shop'

export interface TransactionData {
  type: 'unit',
  data: UnitShopEntry
}

export const transactionStore = writable<TransactionData | undefined>(undefined)

export function performTransaction(slot: SlotNumber | 'auto' = 'auto'){
  const val = get(transactionStore)
  if(!val){
    return
  }
  const after = buyUnit(get(gameInstance), val.data, slot)
  if(after){
    gameInstance.set(after)
  }
  transactionStore.set(undefined)
}