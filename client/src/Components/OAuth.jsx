import {GoogleAuthProvider, getAuth, signInWithPopup} from '@firebase/auth'
import { app } from '../firebase';
import {useDispatch} from 'react-redux';
import {signInSuccess} from "../redux/User/UserSlice.js"
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () =>{
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
       
      const res = await fetch('/api/auth/google', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({name : result.user.displayName, email : result.user.email, photo : result.user.photoURL})
      })
      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate('/')
    }catch(error){
      console.log('could not sign with google', error)
    }
  }
  return (
    <div>
      <button onClick={handleGoogleClick} type="button" className="bg-red-700 p-3 rounded-lg text-white uppercase w-full">Continue With google</button>
    </div>
  )
}
export default OAuth