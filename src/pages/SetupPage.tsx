import { Button } from '@/components/ui/button'

type SetupPageProps = {
  loadSettings: () => Promise<void>
}

const SetupPage: React.FC<SetupPageProps> = ({ loadSettings }) => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
          welcome to calendiary. choose a directory to open your existing diary
          or create a new one
        </h2>
        <Button
          onClick={(e) => {
            e.preventDefault()
            window.ipcRenderer.invoke('open-directory').then((res) => {
              if (res) {
                loadSettings()
              }
            })
          }}
        >
          choose directory
        </Button>
      </div>
    </div>
  )
}

export default SetupPage
