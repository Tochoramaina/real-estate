import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signout from "./Pages/Signout";
import About from "./Pages/About";
import Header from "./Components/Header";
const App = () => {
  return <BrowserRouter>
  <Header/>
   <Routes>
   <Route path="/" element= {<Home/>}/>
   <Route path="/profile" element= {<Profile/>}/>
   <Route path="/signin" element= {<Signin/>}/>
   <Route path="/signup" element= {<Signout/>}/>
   <Route path="/about" element= {<About/>}/>
   </Routes>
  </BrowserRouter>
}
export default App
