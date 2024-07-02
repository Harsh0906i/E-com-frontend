import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../Component/Oauth';
export default function Signup() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  setTimeout(() => {
   setError(false);
  }, 2000);
  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      setloading(true)
      const res = await fetch('https://e-backend-ng9cf9hb5-harshit-singh-aryas-projects.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success === false) {
        setloading(false)
        setError(data.message)
        return
      }
      console.log(data);
      navigate('/signin')
    } catch (error) {
      setError(error)
    }
  }
  function HandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  return (
    <>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={HandleSubmit} className='flex flex-col gap-4' >

          <input type="text" required onChange={HandleChange} className='border p-3 rounded-lg' placeholder="Enter your name..." id='username' />

          <input type="email" required onChange={HandleChange} id='email' className='border p-3 rounded-lg' placeholder="Enter your email..." />

          <input type="password" required onChange={HandleChange} id='password' className='border p-3 rounded-lg' placeholder="Enter password..." />

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">{loading ? 'Loading...' : 'Signup'}</button>
          <Oauth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={'/signin'} className="text-blue-700">Sign in</Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
      
    </>
  )
}
