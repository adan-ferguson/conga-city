import CoolElement from '../../coolElement'
import GamePage from './gamePage'
import { endDay, GameInstance } from '../../../../../shared/game'
import { combatRounds } from '../../../../../shared/combat'

export default class Calendar extends CoolElement{

  static get initialHTML(){
    return  `
<span class="day-and-week"></span>
<span class="rounds"></span>
<button>End Day</button>
    `
  }

  static get tagName(){
    return 'c-calendar'
  }

  static get defaultClass(){
    return 'flex-cols flex-centered'
  }

  constructor(){
    super()
    this.endDayButton.addEventListener('click', () => {
      // TODO: check if we're ready for input
      if(this.gameInstance){
        endDay(this.gameInstance)
      }
    })
  }

  get gameInstance(){
    return (this.parentPage as GamePage)?.gameInstance
  }

  get endDayButton(){
    return this.querySelector('button')!
  }

  update(){
    this._updateDayAndWeek()
    this._updateRounds()
  }

  _updateDayAndWeek(){
    if(!this.gameInstance){
      return
    }
    const daw = this.querySelector('.day-and-week')!
    daw.textContent = `Day: ${this.gameInstance.state.day}, Week: ${this.gameInstance.state.week}`
  }

  _updateRounds(){
    if(!this.gameInstance){
      return
    }
    const ts = this.querySelector('.rounds')!
    ts.textContent = `Combat Rounds: ${combatRounds(this.gameInstance)}`
  }
}

Calendar.register()