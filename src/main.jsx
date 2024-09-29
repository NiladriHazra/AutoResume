import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignInPage from './Pages/auth/sign-in/index.jsx'
import HomePage from './Pages/Home/index.jsx'
import DashboardPage from './Pages/Dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import EditResume from './Pages/Dashboard/resume/[resumeId]/edit/index';
import ViewResume from './my-resume/[resumeId]/view/index.jsx'

const router = createBrowserRouter([
  {
    
    element: <App />,
    children: [
      {
        path:'/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: <EditResume />
      }
    ]
  },
  {
    path:'/',
    element: <HomePage />
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  },{
    path:'my-resume/:resumeId/view',
    element:<ViewResume />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    </ClerkProvider>
   
  </StrictMode>,
)
