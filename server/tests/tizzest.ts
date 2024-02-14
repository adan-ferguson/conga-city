export function tizzest(result: boolean, message: string = ''){
  if(!result){
    throw new TizzestError(message)
  }
}

export function tizzestMustError(fn: () => unknown, message: string = ''){
  let throwAfter = false
  try{
    fn()
    throwAfter = true
  }catch(ex){ /* empty */ }
  if(throwAfter){
    throw new TizzestError(message)
  }
}

export class TizzestError{
  message: string
  constructor(message: string){
    this.message = message
  }
}