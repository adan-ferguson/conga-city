import '../css/reset.css'
import '../css/style.css'
import '../css/common.css'
import App from '../svelte/App.svelte'
import { pendingActionStore } from './pendingAction'
import { gameDefStore, gameStateStore } from './game'
import { gameGame } from '../../game/game'

window.addEventListener('click', () => {
  pendingActionStore.set(undefined)
})

const game = gameGame.createNewInstance({ scenario: 'test' })
gameDefStore.set(game.def)
gameStateStore.set(game.state)

const appEl = document.querySelector<HTMLElement>('#app')!
new App({
  target: appEl
})
