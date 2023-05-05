function sendNotification(message, user) {
    document.onvisibilitychange = ()=> {
      if(document.hidden) {
        const notification = new Notification("New message from Open Chat", {
          icon: "https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg",
          body: `@${user}: ${message}`
        })
        notification.onclick = ()=> function() {
          window.open("http://localhost:3000/chat")
        }
      }
    }  
}


export default sendNotification