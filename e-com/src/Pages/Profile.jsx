import { useDispatch, useSelector } from "react-redux"
import { signOutUserFaliure, signOutUserStart, signOutUserSuccess, userDeleteFaliure, userDeleteSuccess,userDeleteStart } from "../Redux/User/UserSlice";
export default function Profile() {
  const dispatch = useDispatch()
  const { currentUser, loading, error } = useSelector((state) => state.user1)
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
      dispatch(userDeleteStart());
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userDeleteFaliure(data.message))
      }
      dispatch(userDeleteSuccess());
    } catch (error) {
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
        <span onClick={HandleDelete} className="text-red-700 cursor-pointer hover:underline">{loading ? 'Deleting...' : 'Delete account'}</span>
        <span onClick={HandleSignOut} className="text-red-700 cursor-pointer hover:underline">{loading ? 'Signing out...' : 'Sign Out'}</span>
      </div>
    </div>
  )
}
