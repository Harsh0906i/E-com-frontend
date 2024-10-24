import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFaliure } from "../Redux/User/UserSlice"; // Make sure to import failure action
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Oauth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    async function HandleGoogle() {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

            // Prepare user data to send to your backend
            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            };
            console.log(userData)
            const res = await fetch("https://e-backend-two.vercel.app/api/auth/google", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                dispatch(signInSuccess(data.user)); // Dispatch user data on success
                localStorage.setItem('token', data.token);
                navigate('/'); // Redirect after successful sign-in
            } else {
                // Handle case where success is false
                dispatch(signInFaliure(data)); // Dispatch failure action with error message
                console.error(data); // Log the error for debugging
            }
        } catch (error) {
            setLoading(false);
            dispatch(signInFaliure(error)); // Dispatch failure action with error message
            console.error("Sign-in error:", error); // Log the error for debugging
        }
    }

    return (
        <button onClick={HandleGoogle} type="button" disabled={loading} className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            {loading ? 'Loading...' : 'Continue with Google'}
        </button>
    );
}
