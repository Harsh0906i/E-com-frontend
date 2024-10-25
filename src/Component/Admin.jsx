import React, { act, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Admin() {
    const [status, setStatus] = useState(null);
    const { id } = useParams()
    const { currentUser } = useSelector((state) => state.user1)
    const [data, setData] = useState([])
    console.log(data)
    console.log(typeof (data))



    useEffect(() => {
        async function fetchuser() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://e-backend-two.vercel.app/api/item/admin/${currentUser._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    // body: JSON.stringify({
                    //     action: 'reject',
                    //     productId: id,
                    // }),
                });

                if (!response.ok) {
                    throw new Error('Failed to perform action');
                }

                const result = await response.json();
                console.log('result', result)
                setData(result)
                // setStatus(`Product ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
            } catch (error) {
                setStatus(`Error: ${error.message}`);
            }
        }
        fetchuser()
    }, [])


    const handleAction = async (action, productId) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://e-backend-two.vercel.app/api/item/admin/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                action: action,
                productId: productId,
            }),
        });
        const result = await response.json()
        console.log('data isss: ', result)
    };

    return (
        <div className='flex items-center justify-center m-4 p-4'>
            {
                data.map((item) => (
                    <div className='m-4 p-3'>
                        <p>Name: {item.name}</p>
                        <p>RAM: {item.storage.RAM}</p>
                        <p>ROM: {item.storage.ROM}</p>
                        <p>Regular Price: {item.regularPrice}</p>
                        <p>Discounted Price: {item.discountedPrice}</p>
                        <img src={item.image} alt="" />

                        <button onClick={() => handleAction('accept', item._id)} className='bg-green-600 text-white rounded-full p-3'>Accept</button>
                        <button onClick={() => handleAction('reject', item._id)} className='bg-red-600 text-white rounded-full p-3'>Reject</button>
                    </div>
                ))
            }

            {/* {status && <p className='text-center text-gray-500'>{status}</p>} */}
        </div>
    );
}