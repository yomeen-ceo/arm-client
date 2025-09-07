import _ from 'lodash'
import { LocalStorage } from 'quasar'

export function initItem (state, payload) {
  const items = JSON.parse(LocalStorage.getItem('cartItems'))
  if (items) {
    state.items = [...items]
  }
  if (!items) {
    state.items = []
  }
  state.isFirstInit = false
}

export function clearItem (state, payload) {
  state.items = []
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

export function subtractionItemAmount (state, payload) {
  let items = [...state.items]
  items = items.map((item) => {
    const isSameItem = checkIsSameItem({
      itemOne: item,
      itemTwo: payload.item
    })
    if (isSameItem) {
      item.amount -= 1
    }
    return item
  })
  items = items.filter((item) => {
    if (item.amount === 0) {
      return false
    }
    return true
  })
  state.items = [...items]
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

export function additionItemAmount (state, payload) {
  let items = [...state.items]
  items = items.map((item) => {
    const isSameItem = checkIsSameItem({
      itemOne: item,
      itemTwo: payload.item
    })
    if (isSameItem) {
      item.amount += 1
    }
    return item
  })
  state.items = [...items]
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

export function deleteCartItem (state, payload) {
  let items = [...state.items]
  items = items.filter((item) => {
    const isSameItem = checkIsSameItem({
      itemOne: item,
      itemTwo: payload.item
    })
    if (isSameItem) {
      return false
    }
    return true
  })
  state.items = [...items]
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

export function setItem (state, payload) {
  const {
    product,
    selectTaste,
    selectIngredients,
    amount,
    srcItem
  } = payload
  const newItem = {
    product,
    selectTaste,
    selectIngredients,
    amount
  }
  let items = [...state.items]
  items = items.map((item) => {
    const isSameItem = checkIsSameItem({
      itemOne: item,
      itemTwo: srcItem
    })
    if (isSameItem) {
      return newItem
    } else {
      return item
    }
  })
  items = uniqueCartItems({
    items
  })
  state.items = [...items]
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

export function setNewItem (state, payload) {
  const {
    product,
    selectTaste,
    selectIngredients
  } = payload
  const items = [...state.items]
  const findIndex = _.findIndex(items, item => {
    const isSameItem = checkIsSameItem({
      itemOne: item,
      itemTwo: {
        product,
        selectTaste,
        selectIngredients
      }
    })
    return isSameItem
  })
  // 沒找到
  if (findIndex === -1) {
    items.push(payload)
    state.items = [...items]
  }
  // 找到
  if (findIndex !== -1) {
    items[findIndex].amount = items[findIndex].amount + payload.amount
    state.items = [...items]
  }
  LocalStorage.set('cartItems', JSON.stringify(state.items))
}

function checkIsSameItem ({ itemOne, itemTwo }) {
  const isSameProduct = itemOne.product._id === itemTwo.product._id
  if (!isSameProduct) {
    return false
  }
  if (isSameProduct) {
    if (itemOne.selectTaste !== itemTwo.selectTaste) {
      return false
    }
    if (_.xor(itemOne.selectIngredients, itemTwo.selectIngredients).length !== 0) {
      return false
    }
    return true
  }
}

// 將 cart items 中，相同的 item，進行合併 ( amonut 要合併加總 )
function uniqueCartItems ({ items }) {
  let hasSamee = false
  let oneIndex
  let twoIndex
  for (let i = 0, length = items.length; i < length; i = i + 1) {
    const currentItem = items[i]
    for (let j = 0, length = items.length; j < length; j = j + 1) {
      if (i === j) {
        continue
      }
      const isSameItem = checkIsSameItem({
        itemOne: currentItem,
        itemTwo: items[j]
      })
      if (isSameItem) {
        hasSamee = true
        oneIndex = i
        twoIndex = j
        break
      }
    }
    if (hasSamee) {
      break
    }
  }
  if (hasSamee) {
    items[oneIndex].amount = items[oneIndex].amount + items[twoIndex].amount
    items.splice(twoIndex, 1)
    return [...items]
  }
  return items
}
