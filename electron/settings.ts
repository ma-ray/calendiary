import { Settings } from '../shared/settings'
import Store from 'electron-store'

export const getSettings = () => {
  return store.get('settings') as Settings | undefined
}

type SchemaType = {
  settings: Settings
}

const store = new Store<SchemaType>()

export default store
