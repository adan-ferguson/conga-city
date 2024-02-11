import '../css/reset.css'
import '../css/style.css'
import '../css/common.css'
import App from '../svelte/App.svelte'
import { transactionStore } from './stores/transactionStore'
import { createNewGameInstance } from '../../game/game'
import { setGameInstance } from './stores/gameStores'

window.addEventListener('click', () => {
  transactionStore.set(undefined)
})

setGameInstance(createNewGameInstance({ scenario: 'test' }))

const appEl = document.querySelector<HTMLElement>('#app')!
new App({
  target: appEl
})
