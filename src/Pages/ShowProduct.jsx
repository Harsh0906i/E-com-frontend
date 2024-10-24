import { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCartSuccess } from '../Redux/User/UserSlice';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
export default function ShowProduct() {
    const { currentUser } = useSelector((state) => state.user1)
    const { cart } = useSelector((state) => state.user1)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false);
    const [token, settoken] = useState(false);
    const [item, setitem] = useState({});
    const [tokenLoading, settokenLoading] = useState(false)
    const [err, seterr] = useState(false);
    const params = useParams();
    const [open, setOpen] = React.useState(false);
    console.log('item', item)

    useEffect(() => {
        async function fetchItem() {
            try {
                // Make the fetch request
                setloading(true)
                const res = await fetch(`http://localhost:8080/api/item/getItem/${params.itemid}`);
                const data = await res.json(); // Parse the JSON response

                if (!res.ok) {
                    // If the response is not OK, handle the error based on the returned status
                    console.error('Fetch error:', data);
                    setloading(false);  // Stop loading
                    seterr(true);  // Set error state to true
                    return;  // Exit the function
                }

                // If response is OK, set the fetched data in state
                setitem(data);  // Pass the correct data
                setloading(false);  // Stop loading
                seterr(false);  // Clear error state
                console.log('Fetched data:', data);  // Log the fetched data
            } catch (error) {
                // Catch any internal errors (network, parsing issues, etc.)
                console.error('Internal fetch error:', error);  // Log the error
                seterr(true);  // Set error state to true
                setloading(false);  // Stop loading
            }
        }
        fetchItem()
    }, [params.itemid]);

    async function addToCart() {
        const res = await fetch(`http://localhost:8080/api/item/getItem/${params.itemid}`);
        const data = await res.json();
        dispatch(addToCartSuccess({ productData: data, user: currentUser._id }));
    }

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
    function handleToken(e) {
        e.preventDefault();
        settokenLoading(true)
        setTimeout(() => {
            settoken('Token is invalid!')
        }, 2000)
        settokenLoading(false)
    }

    return (
        <>
            {loading ? <h1>Loading...</h1> : (
                <div>
                    <div className=" justify-center">
                        <Card sx={{ maxWidth: 345 }} className="mx-auto mt-8" >
                            <CardMedia
                                sx={{ height: 250 }}
                                image={item.image}
                                title={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">

                                    {item.storage && (
                                        <>
                                            <div>
                                                RAM: {item.storage.RAM} GB
                                            </div>
                                            <div>
                                                ROM: {item.storage.ROM >= 1024 ? `${item.storage.ROM / 1024}TB` : `${item.storage.ROM} GB`}
                                            </div>
                                        </>
                                    )}
                                    <Typography component="span" variant="body2" color="text.secondary">
                                        {item.discountedPrice ? (
                                            <>
                                                Regular Price: <span className="line-through">₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}</span>
                                                <div>
                                                    Discounted Price: ₹{new Intl.NumberFormat('en-IN').format(item.discountedPrice)}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                Price: <span>₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}</span>
                                            </>
                                        )}
                                    </Typography>
                                </Typography>
                            </CardContent>
                            <Button className="">{currentUser ? <button onClick={() => { { addToCart() }; handleClick() }}>Add to cart</button> : <Link className="text-red-700 " to={'/login'}>Sign in to add to cart</Link>}</Button>
                        </Card>
                    </div>
                    <div>
                        <form>
                            <label>Apply token for discount!</label>
                            <input type="text" placeholder="TOKEN..." />
                            <button onClick={handleToken} type="submit" >{tokenLoading?'Applying...':'Apply'}</button>
                        </form>
                        {token && <p className="text-red-500 text-center">{token}</p>}
                    </div>
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
            )}
        </>
    );
}
