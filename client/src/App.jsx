import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signout from "./Pages/Signout";
import About from "./Pages/About";
const App = () => {
  return <BrowserRouter>
   <Routes>
   <Route path="/" element= {<Home/>}/>
   <Route path="/profile" element= {<Profile/>}/>
   <Route path="/sigin" element= {<Signin/>}/>
   <Route path="/signup" element= {<Signout/>}/>
   <Route path="/about" element= {<About/>}/>
   </Routes>
  </BrowserRouter>
}
export default App
