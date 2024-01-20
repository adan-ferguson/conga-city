export function bindInput(
  el: HTMLInputElement,
  getter: () => string,
  setter: (val: string) => void
){
  el.value = getter()
  el.addEventListener('input', () => {
    setter(el.value)
  })
}