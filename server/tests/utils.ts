export function tizzest(result: boolean, message: string = ''){
  if(!result){
    throw new TizzestError(message)
  }
}

export class TizzestError{
  message: string
  constructor(message: string){
    this.message = message
  }
}