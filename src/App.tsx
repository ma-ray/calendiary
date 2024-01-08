import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import DiaryPage from './pages/DiaryPage.tsx'
import { SettingsProvider } from './context/SettingsContext.tsx'

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" replace />,
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
