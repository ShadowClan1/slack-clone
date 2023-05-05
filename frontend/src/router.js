import React from 'react'

const router = () => {
  return (
    <BrowserRouter>
    <>
      <div className="w-screen h-screen bg-slate-300 relative">
        {popUp.visible && <PopUp />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
        </Routes>
      </div>
    </>
  </BrowserRouter>
  )
}

export default router