import '../css/style.css'
import '../css/common.css'
import { loadCoolPage } from './coolRouter'

const appEl = document.querySelector<HTMLElement>('#app')!
appEl.innerHTML = 'Loading'

loadCoolPage().then((page: HTMLElement) => {
  appEl.innerHTML = ''
  appEl.append(page)
})