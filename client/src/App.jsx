import { BrowserRouter, Routes, Route  } from "react-router-dom"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import Signin from "./Pages/Signin"
import Signout from "./Pages/SignUp";
import About from "./Pages/About";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
const App = () => {
  return <BrowserRouter>
  <Header/>
   <Routes>
   <Route path="/" element= {<Home/>}/>
   <Route path="/signin" element= {<Signin/>}/>
   <Route path="/signup" element= {<Signout/>}/>
   <Route path="/listing/:listingId" element={<Listing/>}/>
   <Route element={<PrivateRoute/>}>
   <Route path="/profile" element= {<Profile/>}/>
   <Route path="/create-listing" element={<CreateListing/>}/>
   <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
   </Route>
   <Route path="/about" element= {<About/>}/>
   <Route path="/search" element={<Search/>}/>
   </Routes>
  </BrowserRouter>
}
export default App
