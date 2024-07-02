import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../Firebase/Firebase"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../Redux/User/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Oauth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)
    async function HandleGoogle() {
        try {
            setloading(true);
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch("https://e-backend-6899geh2o-harshit-singh-aryas-projects.vercel.app/api/auth/google", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })
            const data = await res.json();
            setloading(false)
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button onClick={HandleGoogle} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">{loading ? 'Loading...' : 'continue with google'}</button>
    )
}
