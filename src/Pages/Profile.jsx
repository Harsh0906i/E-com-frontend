import { useDispatch, useSelector } from "react-redux"
import { signOutUserFaliure, signOutUserStart, signOutUserSuccess, userDeleteFaliure, userDeleteSuccess } from "../Redux/User/UserSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch()
  const { currentUser, loading } = useSelector((state) => state.user1)
  console.log(currentUser)
  const [deleteState, setDeleteState] = useState(false);

  async function HandleSignOut() {
    try {
      dispatch(signOutUserStart());
      const token = localStorage.getItem('token');
      const res = await fetch('https://e-backend-two.vercel.app/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });

      if (!res.ok) {
        // Handle the error response
        const errorData = await res.json();
        dispatch(signOutUserFaliure(errorData.message));
        return;
      }

      const data = await res.json();
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFaliure(error.message));
    }

  }
  async function HandleDelete() {
    try {
      dispatch(signOutUserStart());
      const token = localStorage.getItem('token');
      const res = await fetch(`https://e-backend-two.vercel.app/api/auth/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signOutUserFaliure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data.message));
    } catch (error) {
      dispatch(signOutUserFaliure(error.message));
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <img src={currentUser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' alt="profile" />

        <input type="text" required value={currentUser.username} className='border p-3 rounded-lg' placeholder="Enter your name..." id='username' />

        <input type="email" required value={currentUser.email} id='email' className='border p-3 rounded-lg' placeholder="Enter your email..." />
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={HandleDelete} className="text-red-700 cursor-pointer hover:underline">{deleteState ? 'Deleting...' : 'Delete account'}</span>
        <span onClick={HandleSignOut} className="text-red-700 cursor-pointer hover:underline">{loading ? 'Signing out...' : 'Sign Out'}</span>
      </div>
      <div className="text-center text-green-700">
        <Link to={`/dashboard/${currentUser._id}`}>
          <button className="bg-green-200 text-green-800 py-2 px-3 rounded-full border border-green-700  hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition">
            Dashboard
          </button>
        </Link>
        
        {currentUser.isAdmin === 'true' && (
          <Link to={`/Admin/${currentUser._id}`}>
            <button className="bg-green-200 text-green-800 py-2 px-3 rounded-full border border-green-700  hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition mx-4">
              Requested Products
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
