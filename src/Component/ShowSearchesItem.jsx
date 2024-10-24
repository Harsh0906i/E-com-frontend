import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartSuccess } from '../Redux/User/UserSlice';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

export default function ShowSearchesItem({ items }) {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useSelector((state) => state.user1);
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        {/* UNDO */}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );


  async function addToCart(ProductData) {
    dispatch(addToCartSuccess({ productData: ProductData, user: currentUser._id }));
  }

  return (
    <div style={{ 'borderRadius': '10px' }} className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/item/${items._id}`}>
        <img src={items.image} alt="Photo" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
        <div className='flex'>
          <div className="p-3 flex flex-col gap-2 w-full truncate">
            <p className='text-lg font-semibold text-slate-700 truncate'>{items.name}</p>
            <p className='text-sm text-gray-600 truncate'><span className='text-red-700 font-semibold'>RAM</span> : {items.storage.RAM} GB</p>
            <p className='text-sm text-gray-600 truncate'><span className='text-red-700 font-semibold'>ROM</span> : {items.storage.ROM === 1024 ? ' 1 TB ' : ` ${items.storage.ROM} GB `}</p>
          </div>
          <div className='my-2 rounded-lg'>
            <span className='text-sm font-semibold text-slate-700'>
              {currentUser ? <Link type='button' style={{ 'borderRadius': '10px' }} className='text-white shadow-lg bg-slate-800 hover:opacity-85 p-2 rounded-lg px-5 m-2' onClick={(e) => { addToCart(items); e.preventDefault(); handleClick() }} >Add</Link> : <Link to={'/signin'} className='text-red-700 text-sm'><button>Sign In</button></Link>}
            </span>
          </div>
        </div>
      </Link>
      <div>
        <Snackbar className='text-white'
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Item added to cart!"
          action={action}
        />
      </div>
    </div>
  )
}