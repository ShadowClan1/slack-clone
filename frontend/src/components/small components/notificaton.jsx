import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeNotification } from '../../redux/slices/notification'
import { htmlParser } from '../../common/htmlparser'

const Notificaton = () => {
    const dispatch = useDispatch()
    const notification = useSelector(s=>s.notification.data)
    
    
  return (

    <div className='absolute  top-20 right-20 bg-black hover:bg-opacity-70  min-w-[300px] h-28 rounded-xl bg-opacity-50 flex flex-col px-4 py-2 shadow-xl' onClick={()=>dispatch(closeNotification())}>

        <div className='text-white font-bold text-sm'>
{ notification.type == 'USER' ? "Meesage from " : "Message in " }{notification.title}
        </div>
        <div className='text-white text-xs mt-2'>
{htmlParser(notification.body)}
        </div>



    </div>
  )
}

export default Notificaton