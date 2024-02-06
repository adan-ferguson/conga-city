import '../css/reset.css'
import '../css/style.css'
import '../css/common.css'
import App from '../svelte/App.svelte'

const appEl = document.querySelector<HTMLElement>('#app')!
new App({
  target: appEl
})
