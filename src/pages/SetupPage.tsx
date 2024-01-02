type SetupPageProps = {
  loadSettings: () => Promise<void>
}

const SetupPage: React.FC<SetupPageProps> = ({ loadSettings }) => {
  return (
    <div className="h-screen">
      <div>welcome to calendiary, choose a directory</div>
      <button
        onClick={(e) => {
          e.preventDefault()
          window.ipcRenderer.invoke('open-directory').then((res) => {
            if (res) {
              loadSettings()
            }
          })
        }}
      >
        open directory
      </button>
    </div>
  )
}

export default SetupPage
