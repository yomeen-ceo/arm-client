import { LocalStorage } from 'quasar'

export function setTables (state, { storeId, tables }) {
  state.isFirstFetchTables = false
  state.tables = tables
  const localStorageTableSelection = JSON.parse(
    LocalStorage.getItem(`stores-${storeId}-tableSelection`)
  )
  const allTableSelection = tables.map(table => table._id)
  // 如果 localStorage 中，沒有 tableSelection
  if (localStorageTableSelection === null) {
    state.tableSelection = allTableSelection
    return
  }
  // 如果 localStorage 中，有 tableSelection
  if (localStorageTableSelection !== null) {
    state.tableSelection = localStorageTableSelection
  }
}

export function setMainKinds (state, { storeId, mainKinds }) {
  state.isFirstFetchMainKinds = false
  state.mainKinds = mainKinds
  const localStorageKindSelection = JSON.parse(
    LocalStorage.getItem(`stores-${storeId}-kindSelection`)
  )
  let allKindSelection = []
  if (mainKinds.length !== 0) {
    for (let i = 0, length = mainKinds.length; i < length; i = i + 1) {
      const { kinds } = mainKinds[i]
      let tempKinds = kinds
      if (kinds.length !== 1) {
        tempKinds = kinds.filter((kind) => {
          return kind._id !== mainKinds[i].kind._id
        })
      }
      allKindSelection = [...allKindSelection, ...tempKinds.map(kind => kind._id)]
    }
  }
  // 如果 localStorage 中，沒有 kindSelection
  if (localStorageKindSelection === null) {
    state.kindSelection = allKindSelection
  }
  // 如果 localStorage 中，有 tableSelection
  if (localStorageKindSelection !== null) {
    state.kindSelection = localStorageKindSelection
  }
}

export function updateTableSelection (state, { storeId, tableSelection }) {
  state.tableSelection = [...tableSelection]
  LocalStorage.set(`stores-${storeId}-tableSelection`, JSON.stringify(state.tableSelection))
}

export function updateKindSelection (state, { storeId, kindSelection }) {
  state.kindSelection = [...kindSelection]
  LocalStorage.set(`stores-${storeId}-kindSelection`, JSON.stringify(state.kindSelection))
}
