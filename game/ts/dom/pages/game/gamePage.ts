import CoolPage from '../coolPage'
import GameInstance from '../../../../../shared/gameInstance'
import Battlefield from '../../battlefield'
import '../../../../css/gamePage.css'

export default class GamePage extends CoolPage{

  private _gameInstance: GameInstance | undefined
  
  static get tagName(){
    return 'c-game-page'
  }

  static get initialHTML(){
    return `
<div class="town-section"></div>
<div class="battlefield-section">
  ${Battlefield.asHTML()}
</div>
<div class="calendar-section"></div>
    `
  }

  get battlefield(): Battlefield{
    return this.querySelector<Battlefield>(Battlefield.tagName)!
  }

  async load(){
    this._gameInstance = this._initGameInstance()
    this.battlefield.gameInstance = this._gameInstance
  }

  _initGameInstance(){
    return this._loadGame() || this._newGame()
  }

  _loadGame(){
    try {
      const activeGame = localStorage.getItem('active-game')
      if(!activeGame){
        return false
      }
      const { def, state } = JSON.parse(activeGame)
      return new GameInstance(def, state)
    }catch(ex){
      return false // Error while loading
    }
  }

  _newGame(){
    return GameInstance.createNew()
  }
}

GamePage.register()