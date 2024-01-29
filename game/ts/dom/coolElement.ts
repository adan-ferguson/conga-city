import { EventEmitter } from 'eventemitter3'
import CoolPage from './pages/coolPage'

export default abstract class CoolElement extends HTMLElement{

  static register(){
    // @ts-expect-error Bite me
    customElements.define(this.tagName, this)
  }

  static asHTML(){
    return `<${this.tagName}></${this.tagName}>`
  }

  static get tagName(): string{ throw 'Not implemented' }
  static get initialHTML(): string{ return '' }
  static get defaultClass(): string{ return '' }

  eventEmitter = new EventEmitter

  protected constructor(){
    super()
    const CLS: typeof CoolElement = <typeof CoolElement>this.constructor
    if(CLS.initialHTML){
      this.innerHTML = CLS.initialHTML
    }
    if(CLS.defaultClass){
      this.classList.add(...CLS.defaultClass.split(' '))
    }
  }

  get parentPage(): CoolPage | undefined{
    return this.closest('.cool-page') as CoolPage
  }

  emit(eventName: string, ...args: unknown[]){
    this.eventEmitter.emit(eventName, ...args)
    return this
  }

  on(eventName: string, cb: (...args: unknown[]) => void){
    this.eventEmitter.on(eventName, cb)
    return this
  }
}