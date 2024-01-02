import { ReactNode, createContext, useEffect, useState } from 'react'
import SetupPage from '../pages/SetupPage'
import { Settings } from '../../shared/settings'

type SettingsContextType = {
  settings?: Settings
  setSettings: (value: Settings) => void
  loadSettings: () => Promise<void>
}

export const SettingsContext = createContext<SettingsContextType>({
  setSettings: () => {},
  loadSettings: () => Promise.reject(),
})

type SettingsProviderProps = {
  children: ReactNode
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  const loadSettings = () =>
    window.ipcRenderer.invoke('get-settings').then((e) => {
      setSettings(e)
      setLoading(false)
    })

  useEffect(() => {
    loadSettings()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return settings ? (
    <SettingsContext.Provider value={{ settings, setSettings, loadSettings }}>
      {children}
    </SettingsContext.Provider>
  ) : (
    <SetupPage loadSettings={loadSettings} />
  )
}
