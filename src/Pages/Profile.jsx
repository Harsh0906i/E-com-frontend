import { useDispatch, useSelector } from "react-redux"
import { signOutUserFaliure, signOutUserStart, signOutUserSuccess, userDeleteFaliure, userDeleteSuccess } from "../Redux/User/UserSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector((state) => state.user1)
  const [deleteState, setDeleteState] = useState(false);

  async function HandleSignOut() {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json()
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFaliure(error.message))
    }
  }
  async function HandleDelete() {
    try {
      setDeleteState(true)
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userDeleteFaliure(data.message))
        setDeleteState(false)
      }
      setDeleteState(false)
      dispatch(userDeleteSuccess());
    } catch (error) {
      setDeleteState(false)
      dispatch(userDeleteFaliure(error.message))
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
      </div>
    </div>
  )
}
