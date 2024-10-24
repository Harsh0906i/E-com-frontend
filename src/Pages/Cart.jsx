import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCartSuccess } from '../Redux/User/UserSlice';

const Cart = () => {
  const { cart, currentUser } = useSelector((state) => state.user1);
  const Dispatch = useDispatch()


  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-center font-bold text-lg m-3'>Your Cart Items:</h2>
      {currentUser ? (
        <div className='grid gap-4 p-4'>
          {cart.filter(item => item.userId === currentUser._id).length === 0 ? (
            <p className='text-center text-gray-500'>Empty Cart</p>
          ) : (
            <>
              <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {cart
                  .filter(item => item.userId === currentUser._id)
                  .map((item, index) => (
                    <div key={index} className='flex justify-evenly items-center border p-4 rounded-lg bg-white' style={{ 'borderRadius': "20px" }} >

                      <div className='flex justify-start sm:pr-2 md:pr-5'>
                        <img src={item.image} alt={item.name} className='w-32 h-32 object-cover shadow-md' style={{ 'borderRadius': "20px" }} />
                      </div>
                      <div className='mb-4'>
                        <div>
                          <h1 className=' capitalize font-bold text-lg text-center mb-3'>{item.name}</h1>
                        </div>
                        {item.discountedPrice ? (
                          <>
                            <h2 className='text-sm sm:text-md font-semibold'>
                              <span className='font-bold'>Discounted Price</span> : ₹{new Intl.NumberFormat('en-IN').format(item.discountedPrice)}
                            </h2>
                            <h3 className='text-sm text-gray-500 line-through'>
                              <span className='font-bold'>Regular Price</span> : ₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}
                            </h3>
                          </>
                        ) : (
                          <h2 className='text-sm sm:text-md font-semibold'>
                            <span className='font-bold'>Price</span> : ₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}
                          </h2>
                        )}

                        <h3 className='font-bold text-sm'>RAM : {item.RAM} GB</h3>
                        <h3 className='font-bold text-sm'>
                          ROM : {item.ROM >= 1024 ? `${item.ROM / 1024} TB` : `${item.ROM} GB`}
                        </h3>
                        <div className='mt-3'>
                          <button onClick={() => Dispatch(removeFromCartSuccess({ productId: item.productId }))} className='bg-red-500 rounded-full text-center text-white px-3 py-2 hover:opacity-90'>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </ul>
              <hr />

              <p className='mt-6 text-lg text-center font-semibold'>
                Total Price: ₹
                {new Intl.NumberFormat('en-IN').format(
                  cart
                    .filter(item => item.userId === currentUser._id)
                    .reduce((total, item) => {
                      // Use discountedPrice if available, otherwise fallback to regularPrice or 0
                      const price = item.discountedPrice ?? item.regularPrice ?? 0;
                      return total + price;
                    }, 0)
                )}
              </p>

            </>
          )}
        </div>

      ) : (
        <p>Please log in to see your cart items.</p>
      )}
    </div>
  );
};

export default Cart;