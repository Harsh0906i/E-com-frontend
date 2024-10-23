import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../Redux/User/UserSlice"; // Fixed typo
import Oauth from "../Component/Oauth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' }); // Initialize with empty strings
  const { loading, error } = useSelector((state) => state.user1);

  useEffect(() => {
    // Reset error after 3 seconds
    const timer = setTimeout(() => {
      if (error) {
        dispatch(signInFailure()); // Ensure the action name is consistent
      }
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [error, dispatch]);

  function HandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!data.success) { // Simplified condition
        dispatch(signInFailure(data.message)); // Adjusted action name
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message)); // Use error.message for better context
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={HandleSubmit} className='flex flex-col gap-4'>
        <input
          type="email"
          required
          onChange={HandleChange}
          className='border p-3 rounded-lg'
          placeholder="Enter your email..."
          id="email"
          style={{ borderRadius: '15px' }}
          disabled={loading} // Disable input while loading
        />
        <input
          onChange={HandleChange}
          required
          type="password"
          className='border p-3 rounded-lg'
          placeholder="Enter password..."
          id="password"
          style={{ borderRadius: '15px' }}
          disabled={loading} // Disable input while loading
        />
        <button
          style={{ borderRadius: '15px' }}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={'/signup'} className="text-blue-700">Sign up</Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
