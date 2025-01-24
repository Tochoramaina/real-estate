import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signout from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
const App = () => {
  return <BrowserRouter>
  <Header/>
   <Routes>
   <Route path="/" element= {<Home/>}/>
   <Route path="/signin" element= {<Signin/>}/>
   <Route path="/signup" element= {<Signout/>}/>
   <Route element={<PrivateRoute/>}>
   <Route path="/profile" element= {<Profile/>}/>
   <Route path="/create-listing" element={<CreateListing/>}/>
   </Route>
   <Route path="/about" element= {<About/>}/>
   </Routes>
  </BrowserRouter>
}
export default App
