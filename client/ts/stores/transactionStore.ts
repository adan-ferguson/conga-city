import { writable, get } from 'svelte/store'
import type { UnitShopEntry } from '../../../game/shop'
import type { SlotNumber } from '../../../game/game'
import { gameStateStore, getGameInstance } from './gameStores'
import { buyUnit } from '../../../game/shop'

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
  const afterState = buyUnit(getGameInstance(), val.data, slot)
  if(afterState){
    gameStateStore.push(afterState)
  }
  transactionStore.set(undefined)
}