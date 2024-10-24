import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../Component/Oauth';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear error message after 2 seconds using useEffect
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts or error changes
    }
  }, [error]);

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('https://e-backend-two.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // This will now always work if the backend sends valid JSON

      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      console.log(data);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      console.log(error)
      setError('An unexpected error occurred');
    }
  }

  function HandleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={HandleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            onChange={HandleChange}
            className="border p-3 rounded-lg"
            placeholder="Enter your name..."
            id="username"
            style={{ borderRadius: '15px' }}
          />
          <input
            type="email"
            required
            onChange={HandleChange}
            id="email"
            className="border p-3 rounded-lg"
            placeholder="Enter your email..."
            style={{ borderRadius: '15px' }}
          />
          <input
            type="password"
            required
            onChange={HandleChange}
            id="password"
            className="border p-3 rounded-lg"
            placeholder="Enter password..."
            style={{ borderRadius: '15px' }}
          />
          <button
            style={{ borderRadius: '15px' }}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Signup'}
          </button>
          <Oauth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to="/signin" className="text-blue-700">
            Sign in
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </>
  );
}
