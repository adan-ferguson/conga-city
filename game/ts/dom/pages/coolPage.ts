import CoolElement from '../coolElement.js'

export default abstract class CoolPage extends CoolElement{
  private readonly _args: string[]
  abstract load(): Promise<unknown>
  constructor(args: string | string[]){
    super()
    this._args = Array.isArray(args) ? args : [args]
  }
  get args(){
    return this._args
  }
}