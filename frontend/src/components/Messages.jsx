import React, { useEffect, useRef } from 'react'
import Message from './small components/Message'

const Messages = ({messages}) => {
const scroll = useRef(null)
useEffect(
  () =>{

    scroll?.current?.scrollIntoView()
  },
  [messages.length]
)

  return (
    <div className='flex flex-col gap-2 mt-2  overflow-y-scroll max-h-[445px]  '>

{messages?.map((e)=>{
    return <Message key={Math.random()} data={e}/>
})}

        <div ref={scroll} className='h-0'></div>
    </div>
  )
}

export default Messages