import React from 'react'
import { Link } from 'react-router-dom'

const Failed = () => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center'>
<div className='w-1/2 h-3/4 bg-white rounded-xl flex flex-col '>

<div className=' h-5/6 flex flex-col justify-center items-center'>
    <Link to='/'>
    <h1>  Back to home </h1>
    </Link>

</div>
<div className='h-1/6 flex flex-col items-center' > 
<button className='bg-red-400 w-3/4 py-4 animate-pulse text rounded-lg text-white'>payment Failed</button> </div>
</div>


    </div>
  )
}

export default Failed