export function initItem (context, payload) {
  context.commit('initItem', payload)
}

export function clearItem (context, payload) {
  context.commit('clearItem', payload)
}

export function setItem (context, payload) {
  context.commit('setItem', payload)
}

export function setNewItem (context, payload) {
  context.commit('setNewItem', payload)
}

export function subtractionItemAmount (context, payload) {
  context.commit('subtractionItemAmount', payload)
}

export function additionItemAmount (context, payload) {
  context.commit('additionItemAmount', payload)
}

export function deleteCartItem (context, payload) {
  context.commit('deleteCartItem', payload)
}
