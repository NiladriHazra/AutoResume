import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './components/custom/Header';
import { useContext } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';

function App() {
  // Clerk authentication
  const { user, isLoaded, isSignedIn } = useUser();

  // If user is not signed in and the data is loaded
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <><ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Header />
      {/* Will render all the children of the App */}
      <Outlet />
      <Toaster />
  </ThemeProvider>

     
    </>
  )
}

export default App
