import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Admin() {
    const [status, setStatus] = useState(null);
    const { id } = useParams()

    const handleAction = async (action) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://e-backend-two.vercel.app/api/item/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({
                    action: action,
                    productId: id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to perform action');
            }

            const result = await response.json();
            console.log(result)
            setStatus(`Product ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className='flex items-center justify-center m-4 p-4'>
            <button onClick={() => handleAction('accept')} className='bg-green-600 text-white rounded-full p-3'>Accept</button>
            <button onClick={() => handleAction('reject')} className='bg-red-600 text-white rounded-full p-3'>Reject</button>

            {status && <p className='text-center text-gray-500'>{status}</p>}
        </div>
    );
}