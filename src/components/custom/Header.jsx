import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { ModeToggle } from '../mode-toggle'
import { Home } from 'lucide-react'

const Header = () => {

    const {user, isSignedIn} = useUser()

  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <img src='/logo.svg' width={40} height={40}/>
      
     
        {isSignedIn ?
        <div className='flex gap-2 items-center '>
           <ModeToggle />
          <Link to={'/'}>

          <Button variant='outline'><Home /></Button></Link>
          
            <Link to={'/dashboard'}>
          <div className='flex justify-between gap-5'>
           
            
        
        <Button variant='outline'>Dashboard</Button></div>
        </Link>
        <UserButton />
        
        </div>   :
         <div>
            <Link to={'/auth/sign-in'}>
        <Button>Get Started</Button>
        
        </Link>
         </div>
    }

        
    </div>
  )
}

export default Header


