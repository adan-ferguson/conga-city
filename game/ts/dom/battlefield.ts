import CoolElement from './coolElement'
import { GameInstance } from '../../../shared/gameInstance'

export default class Battlefield extends CoolElement{

  static get tagName(){
    return 'c-battlefield'
  }

  private _gameInstance: GameInstance | undefined

  set gameInstance(val: GameInstance){
    this._gameInstance = val
    this._update()
  }

  _update(){
    if(!this._gameInstance){
      return
    }
  }
}

Battlefield.register()