import CoolPage from '../coolPage'

export default class GamePage extends CoolPage{
  static get tagName(){
    return 'c-fight-page'
  }

  async load(){
    // const pixiApp = setupPixiApp(this)
    // const gameClient = new GameClient(pixiApp)
    // await gameClient.init()
  }
}

GamePage.register()