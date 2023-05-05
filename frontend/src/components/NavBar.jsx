import React, { useEffect } from 'react'
import { getUser } from '../localstorage manger/localstorage'

const NavBar = () => {
    const user = getUser()
    
    
  return (
    <div className='flex flex-row bg-purple-900 fixed top-0 w-screen items-center px-5 h-10 justify-end shadow-xl'>
{ user && 
  <div className='flex flex-row gap-2 items-center'> <img src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg" alt="" className='w-5 h-5 rounded-full outline-double  outline-offset-2 outline-white' /> 

<span className='text-white'>


{ user.name}
 
</span>
  </div>
}
    </div>
  )
}

export default NavBar