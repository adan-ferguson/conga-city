import CoolElement from '../../coolElement'
import { GameInstance } from '../../../../../shared/game'
import GamePage from './gamePage'

export default class Battlefield extends CoolElement{

  static get tagName(){
    return 'c-battlefield'
  }

  get gameInstance(){
    return (this.parentPage as GamePage)?.gameInstance
  }

  update(){

  }

}

Battlefield.register()