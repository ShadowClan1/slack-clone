export const agoReturn = (time) => {
    const date = new Date().getTime()
    const dateOld = new Date(time).getTime()
    let agoTiming =  (date - dateOld)/(24 * 60 * 60 * 1000)
    if(agoTiming < 1) {
      agoTiming  = agoTiming *24
      if(agoTiming >= 1){return `${Math.floor(agoTiming) } hours ago`}
    
      agoTiming = agoTiming * 60 
      
      if(agoTiming >= 1 ) {return `${Math.floor(agoTiming) } minutes ago`}
      agoTiming = agoTiming * 60 
    
      if(agoTiming >= 1 ) {return `${Math.floor(agoTiming) } seconds ago`}
    } 
    if(agoTiming > 1) return `${Math.floor(agoTiming)} days ago`
    
    }