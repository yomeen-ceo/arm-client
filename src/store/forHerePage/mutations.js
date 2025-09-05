import _ from 'lodash'

export function setOrders (state, { orders }) {
  state.isFirstFetch = false
  state.orders = [...orders]
}

export function setIsFirstFetch (state, { isFirstFetch }) {
  state.isFirstFetch = isFirstFetch
}

export function toggleSelectItem (state, { item, tableName }) {
  const selectItems = [...state.selectItems]
  const findIndex = _.findIndex(selectItems, selectItem => {
    return selectItem._id === item._id
  })
  if (findIndex === -1) {
    selectItems.push(item)
    state.selectItems = selectItems
    state.selectActiveTableName = tableName
  }
  if (findIndex !== -1) {
    _.pullAt(selectItems, [findIndex])
    state.selectItems = selectItems
    if (state.selectItems.length === 0) {
      state.selectActiveTableName = ''
    }
    if (state.selectItems.length !== 0) {
      state.selectActiveTableName = tableName
    }
  }
}

export function clearSelectItems (state) {
  state.selectItems = []
}

export function showRemark (state, { item }) {
  state.remark.isShow = true
  state.remark.item = item
}

export function hideRemark (state) {
  state.remark.isShow = false
  state.remark.item = null
}
