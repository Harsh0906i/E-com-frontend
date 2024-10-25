import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Admin() {
    const [status, setStatus] = useState(null);
    const { id } = useParams()
    const { currentUser } = useSelector((state) => state.user1)
    const [data, setData] = useState([])
    console.log(data)
    console.log(typeof(data))

    data.map((item) => (
        console.log(item.name)
        // console.log(item)
    ))

    useEffect(() => {
        async function fetchuser() {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://e-backend-two.vercel.app/api/item/admin/${currentUser._id}`, {
                    method: 'POST',
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


    // const handleAction = async (action) => {

    // };

    return (
        <div className='flex items-center justify-center m-4 p-4'>

            {/* <button onClick={() => handleAction('accept')} className='bg-green-600 text-white rounded-full p-3'>Accept</button>
            <button onClick={() => handleAction('reject')} className='bg-red-600 text-white rounded-full p-3'>Reject</button> */}

            {/* {status && <p className='text-center text-gray-500'>{status}</p>} */}
        </div>
    );
}