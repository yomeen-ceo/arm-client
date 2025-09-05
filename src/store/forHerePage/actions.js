import { axiosInstance } from 'boot/axios'

export async function fetch (context, { storeId, orderStates = ['A002'] }) {
  try {
    const { data } = await axiosInstance.post(`/v1/stores/${storeId}/orders/getKitchenOrders`, {
      orderStates
    })
    context.commit('setOrders', {
      orders: data.orders
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function setOrders (context, { orders }) {
  context.commit('setOrders', {
    orders
  })
}

export function setIsFirstFetch (context, { isFirstFetch }) {
  context.commit('setIsFirstFetch', {
    isFirstFetch
  })
}

export async function updateItemState (context, { uid, storeId, itemState }) {
  try {
    const updateItems = [...context.state.selectItems].map(item => {
      return {
        orderId: item.orderId,
        itemId: item._id,
        itemState
      }
    })
    await axiosInstance.patch(`/v1/stores/${storeId}/updateItemState`, {
      uid,
      updateItems
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export function toggleSelectItem (context, { item, tableName }) {
  context.commit('toggleSelectItem', {
    item,
    tableName
  })
}

export function clearSelectItems (context) {
  context.commit('clearSelectItems')
}

export function clickRemark (context, { item: newItem }) {
  const {
    isShow: isCurrentShow,
    item: oldItem
  } = context.state.remark
  if (isCurrentShow && oldItem._id === newItem._id) {
    context.commit('hideRemark')
  }
  if (isCurrentShow && oldItem._id !== newItem._id) {
    context.commit('showRemark', {
      item: newItem
    })
  }
  if (!isCurrentShow) {
    context.commit('showRemark', {
      item: newItem
    })
  }
}

export function showRemark (context, { item }) {
  context.commit('showRemark', {
    item
  })
}

export function hideRemark (context) {
  context.commit('hideRemark')
}
