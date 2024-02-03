

export async function fizzetch<T = Record<string, never>>(url: string, data: unknown = null): Promise<T>{
  let resp
  let text
  try {
    const obj: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if(data){
      obj.body = JSON.stringify(data)
    }

    resp = await fetch(url, obj)
    text = await resp.text()
    return JSON.parse(text)
  }catch(ex){
    debugger
    throw 'Oh no'
    // if(!resp || resp.status >= 400){
    //   if(text){
    //     return { error: text }
    //   }
    //   return { error: ex || `An error occurred during fizzetch of ${url}` }
    // }
    // return {}
  }
}