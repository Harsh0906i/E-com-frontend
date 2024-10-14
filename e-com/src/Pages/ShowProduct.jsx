import { useEffect } from "react"
import { useParams } from "react-router-dom";
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
    const [item, setitem] = useState({});
    const [Copied, setCopied] = useState(false)
    const [err, seterr] = useState(false);
    const params = useParams();
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        async function fetchItem() {
            try {
                const res = await fetch(`https://e-backend-xi.vercel.app/api/item/getItem/${params.itemid}`);
                const data = await res.json();
                if (data.success === false) {
                    setloading(false);
                    return;
                }
                setitem(data);
                setloading(false);
                seterr(false);
            } catch (error) {
                seterr(true);
                setloading(false);
            }
        }
        fetchItem();
    }, [params.itemid]);

    async function addToCart() {
        const res = await fetch(`https://e-backend-xi.vercel.app/api/item/getItem/${params.itemid}`);
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

    return (
        <>
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
                                Regular Price: <span className="line-through">₹{item.regularPrice}</span>
                            </Typography>
                            <div>
                                Discounted Price: ₹{item.discountedPrice}
                            </div>
                        </Typography>
                    </CardContent>
                    <Button>{currentUser ? <button onClick={() => { { addToCart() }; handleClick() }}>Add to cart</button> : <span className="text-red-700">Sign in to add to cart</span>}</Button>
                </Card>
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
        </>
    );
}
