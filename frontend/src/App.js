import { useSelector } from "react-redux";
import Tile from "./components/Tile";
import PopUp from "./components/PopUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Success from "./components/Success";
import Failed from "./components/Failed";
import Login from "./pages/login/Login";
import { getUser } from "./localstorage manger/localstorage";
import { useEffect } from "react";
import { socketConnect } from "./socket.io/socket";

function App() {
  const popUp = useSelector((state) => state.popup);
  useEffect(() => {



  }, [])
  

  return (
    <BrowserRouter>
      <>
        <div className="w-screen h-screen bg-slate-300 relative">
          {popUp.visible && <PopUp />}
          <Routes>
            <Route path="/" element={<Login />} />



<Route path="/home/*" element={<Home />} />




          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
