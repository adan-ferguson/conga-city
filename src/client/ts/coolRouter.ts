import LobbyPage from './dom/pages/lobby/lobbyPage'
import CoolPage from './dom/pages/coolPage'
import FightPage from './dom/pages/fight/fightPage'

type Route = {
  def: Array<string | number>,
  PageType: typeof CoolPage
}

const ROUTES: Route[] = [
  {
    def: ['fight', 0], PageType: FightPage
  }
]

export async function loadCoolPage(): Promise<HTMLElement>{
  const targetPage = getRoutedPage()
  let error = ''
  if(targetPage){
    try {
      await targetPage.load()
      return targetPage
    }catch(ex){
      error = typeof ex === 'string' ? ex : ''
    }
  }
  const defaultPage = new LobbyPage(error)
  await defaultPage.load()
  return defaultPage
}

function getRoutedPage(){
  const chunks = window.location.pathname.split('/').filter(n => n)
  let page: CoolPage | undefined
  ROUTES.find(({ def, PageType }) => {
    if(def.length !== chunks.length){
      return false
    }
    const args = []
    for(let i = 0; i < def.length; i++){
      if(typeof def[i] === 'string'){
        if(def[i] !== chunks[i]){
          return false
        }
      }else{
        args.push(chunks[i])
      }
    }
    // @ts-expect-error - No, it's fine
    page = new PageType(args)
    return true
  })
  return page
}