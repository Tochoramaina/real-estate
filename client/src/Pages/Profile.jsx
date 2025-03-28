import { useSelector } from "react-redux"
import {useRef, useState, useEffect} from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import {deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, updatedUserStart,updatedUserSuccess, updateUserFailure} from '../redux/User/UserSlice';
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';


const Profile = () => {
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setshowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch() 
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage =  getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => { 
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
    (error) => { 
      setFileUploadError(true)
      console.log(error)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      // eslint-disable-next-line no-unexpected-multiline
      ((downloadloadURL) => setFormData({...formData, avatar : downloadloadURL})
        );
      }
    )
  };
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id] : e.target.value})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatedUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers: {
          'Content-Type' : 'appilication/json',
        },
        body : JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updatedUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
    const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method : 'DELETE',

        });
        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data))
      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
    }
    const handleSignOut = async () => {
     try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
     } catch (error) {
      dispatch(deleteUserFailure(error.message))
     }
    }

   const handleShowListings = async () => {
    try {
      setshowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json();
      if(data.success === false){
        setshowListingsError(true);
        return
      }
      setUserListings(data);
    } catch (error) {
      setshowListingsError(error)
    }
   }
   
   const handleListingDelete = async (listingId) => {
    try {
      const res  = await fetch(`/api/listing/delete/${listingId}`, {
        method : 'DELETE'
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
   }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.file [0])} type='file' ref={fileRef} hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src={formData.avatar || currentUser.avatar} alt="profile"/>
        <p className="text-sm self-center">
          {fileUploadError ? (
          <span className="text-red-700">Error Image upload</span> ) :
          filePerc > 0 && filePerc < 100 ? (
          <span className="text-slate-700">{`Uploading ${filePerc}`}</span>) :
          filePerc === 100 ? (
          <span className="text-green-700">Successfully uploaded</span>) :
          ''
        }
        </p>
        <input type="text" placeholder="username" id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg"onChange={handleChange} />
        <input type="text" placeholder="email" id="email" defaultValue={currentUser.email} className="border p-3 rounded-lg"onChange={handleChange} />
        <input type="password" placeholder="password" id="username" className="border p-3 rounded-lg" onChange={handleChange}/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95" disabled={loading}>{loading ? 'Loading...' : 'update'}</button>
        <Link className="bg-green-700 text-white p-3 rounded-lg text-center uppercase hover:opacity-95" to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700">{error ? error : ''}</p>
      <p className="text-green-700">{updateSuccess ? 'User is updated successfully' : ''}</p>
      <button onClick={handleShowListings} className="text-green-700 w-full">Show Listings</button>
      <p className="text-red-400 mt-5">{showListingsError ? "Error showing listings" : ''}</p>
      {userListings && userListings.length > 0 &&  
      <div className="flex flex-col gap-4">
        <h1 className="text-center mt-6 text-2xl font-semibold">Your Listings</h1>
        {userListings.map((listing) => (<div key={listing._id}
        className="border rounded-lg p-3 flex justify-between items-center gap-4">
          <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing cover image" className="h-16 w-16 object-contain"/>
          </Link>
          <Link className="text-slate-700 font-semibold flex-1 hover:underline truncate" to={`/listing/${listing._id}`}>
          <p >{listing.name}</p>
          </Link>
          <div className="flex flex-col items-center">
            <button onClick={() => handleListingDelete(listing._id)}  className="text-red-700 uppercase">Delete</button>
           <Link  to={`/update-listing/${listing._id}`}>
           <button className="text-green-700 uppercase">Edit</button>
           </Link>
      m   </div>
      </div>
      
    ))}
    </div>}
    </div>
  )
}
export default Profile;