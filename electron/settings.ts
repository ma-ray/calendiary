import { store } from './main'
import { Settings } from '../shared/settings'

export const getSettings = () => {
  return store.get('settings') as Settings | undefined
}
