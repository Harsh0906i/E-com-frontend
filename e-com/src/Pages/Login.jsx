import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { signInFaliure, signInStart, signInSuccess } from "../Redux/User/UserSlice";
import Oauth from "../Component/Oauth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user1);
  function HandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  setTimeout(() => {
    dispatch(signInFaliure());
  }, 3000);
  async function HandleSubmit(e) {
    e.preventDefault()
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFaliure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFaliure(error.message))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={HandleSubmit} className='flex flex-col gap-4' >
        <input type="email" required onChange={HandleChange} className='border p-3 rounded-lg' placeholder="Enter your email..." id="email" />
        <input onChange={HandleChange} required type="password" className='border p-3 rounded-lg' placeholder="Enter password..." id="password" />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">{loading ? 'Loading...' : 'Sign in'}</button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={'/signup'} className="text-blue-700">Sign up</Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  )
}
