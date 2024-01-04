import { AlertOctagon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <AlertOctagon className="h-20 w-20" />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          whoops... whatever you are looking for is not here
        </h3>
        <Link to="/">
          <Button>go back home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
