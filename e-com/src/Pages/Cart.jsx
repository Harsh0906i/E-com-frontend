import { removeFromCartSuccess } from '../Redux/User/UserSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Cart() {
  const cart = useSelector((state) => state.user1.cart);
  const { currentUser } = useSelector((state) => state.user1);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, item) => {
    if (currentUser._id === item.userId) {
      return total + item.discountedPrice;
    }
    return total;
  }, 0);
  function handleRemove(itemId) {
    dispatch(removeFromCartSuccess(itemId))

  }
  return (
    <>
      <div className='flex items-center justify-center'>
        <h2 className="font-semibold my-2">Your Cart:</h2>
      </div>
      <div className="flex flex-col justify-center items-center ">
        {currentUser ? (
          <div>
            <div>
              <div className='flex flex-wrap gap-2'>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div>
                      {
                        currentUser._id === item.userId ? (
                          <div key={item.image} className="flex items-center border-b-2 mb-4 ml-8">
                            <img className="w-[100px] h-[100px] shadow-md bg-center bg-no-repeat rounded-full" src={item.image} alt="photo" />
                            <div className="flex flex-col ml-3">
                              <div>
                                <span className='font-semibold'>{item.name}:</span>
                              </div>
                              <div className="font-semibold">
                                <span className='text-sm'>Discounted Price</span> - ₹{item.discountedPrice}
                              </div>
                              <div className="text-sm">
                                <span className="text-red-700 text-sm">RAM:</span> {item.RAM} GB
                              </div>
                              <div className="text-sm">
                                <span className="text-red-700 text-sm">ROM:</span> {item.ROM >= 1024 ? `${item.ROM / 1024}TB` : `${item.ROM} GB`}
                              </div>
                              <div className="m-2">
                                <button className="bg-red-500 hover:opacity-85 text-white rounded-lg px-2 py-1 text-sm " onClick={() => handleRemove(item.productId)}>Remove</button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ''
                        )
                      }
                    </div>
                  ))
                ) : (
                  <p>Cart is empty!</p>
                )}
              </div>
            </div>
            <div className='flex items-center justify-center mt-4'>
              <h1 className='font-semibold'>Total: ₹{totalPrice}</h1>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="font-semibold">Sign in to access cart</h2>
            <Link to={'/signin'} className='text-blue-500 m-3'>SignIn</Link>
          </div>
        )}
      </div>
    </>
  );
}