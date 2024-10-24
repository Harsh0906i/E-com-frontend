import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Admin() {
    const [status, setStatus] = useState(null);
    const { id } = useParams()
    console.log(id)

    const handleAction = async (action) => {
        try {
            const response = await fetch(`http://localhost:8080/api/item/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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