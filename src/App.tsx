import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import DiaryPage from './pages/DiaryPage.tsx'
import { SettingsProvider } from './context/SettingsContext.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/diary/:year/:month/:day',
    element: <DiaryPage />,
  },
])

const App = () => {
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  )
}

export default App
