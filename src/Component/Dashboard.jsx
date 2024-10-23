import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user1);
  const { id } = useParams();
  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    async function getUserItem() {
      try {
        setloading(true)
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/item/dashboard/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
        });
        const result = await response.json();
        if (!response.ok) {
          setloading(false)
          setError(result.message);
          console.log(error)
        } else {
          setloading(false)
          setData(result);
          console.log(data)
        }
      } catch (error) {
        setloading(false)
        setError("An error occurred while fetching data.");
      }
    }
    getUserItem();
  }, [id, itemDeleted]);

  async function deleteItem(userId, itemId) {
    try {
      const response = await fetch('/api/item/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userId, item: itemId }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Item deleted successfully:', result);
        setItemDeleted((prev) => !prev);
      } else {
        console.error('Failed to delete item:', result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  }

  return (
    <div className='m-4'>
      {loading && <Typography sx={{ color: 'black' }}> <p>Loading</p> </Typography>}
      {
        data.length > 0 ?
          <ul style={{ listStyleType: 'none', padding: 0 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.isArray(data) ? (
              data.map((item, index) => (
                <li key={index}>
                  <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
                    <CardHeader
                      title={item.name}
                      subheader={`Created on: ${new Date(item.createdAt).toLocaleDateString()}`}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.image}
                      alt={`${item.name} image`}
                    />
                    <CardContent className="flex bg-slate-100 justify-between items-center">
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <div>
                          {item.discountedPrice ? (
                            <>
                              <strong>Regular Price:</strong>{" "}
                              <span className="line-through">₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}</span>{" "}
                              <br />
                              <div className='block'>
                                <strong>Discounted Price:</strong>₹{new Intl.NumberFormat('en-IN').format(item.discountedPrice)}
                              </div>
                            </>
                          ) : (
                            <>
                              <strong className="text-lg">Price:</strong>₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}
                            </>
                          )}
                          <p>RAM: {item.storage.RAM >= 1024 ? `${item.storage.RAM / 1024}TB` : `${item.storage.RAM} GB`}</p>
                          <p>ROM: {item.storage.ROM >= 1024 ? `${item.storage.ROM / 1024}TB` : `${item.storage.ROM} GB`}</p>
                        </div>
                      </Typography>
                      <button className='text-white bg-red-500 p-2 rounded-xl hover:opacity-90' disabled={loading} onClick={() => deleteItem(currentUser._id, item._id)}>{loading ? '...' : 'Delete'}</button>
                    </CardContent>
                  </Card>
                </li>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </ul> : <p className='text-center'>No item found! upload atleast one Item! <Link to={`/Upload`} className='text-blue-300'>-Upload</Link></p>
      }
    </div>
  );
};

export default Dashboard;

