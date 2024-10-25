import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Upload = () => {
  const { currentUser } = useSelector((state) => state.user1);
  const [showDiscountedPrice, setShowDiscountedPrice] = useState(false);
  const [formData, setFormData] = useState({});
  const [productType, setProductType] = useState('none');
  const [error, setError] = useState(null);
  const [received, setReceived] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setShowDiscountedPrice(!showDiscountedPrice);
  };

  const handleChange = (event) => {
    const { id, value, type, files } = event.target;

    if (id === 'productType') {
      setProductType(value);
      if (value === 'none') {
        setError('Please select a valid product type');
      } else {
        setError(null);
      }
    }

    if (type === 'file') {
      setFormData({
        ...formData,
        [id]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  setTimeout(() => {
    if (error) {
      setError(null)
    }
  }, 3000);

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!formData.image) {
      setError('Please upload an image');
      return;
    }

    if (productType === 'none') {
      setError('Please select a type of product');
      return;
    }

    if (!formData.RAM || !formData.ROM) {
      setError('Please enter both RAM and ROM values');
      return;
    }

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (showDiscountedPrice && formData.discountedPrice) {
      formDataToSend.append('discountedPrice', formData.discountedPrice);
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/item/sell/${currentUser._id}`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error uploading product');
      }

      const result = await response.json();
      setReceived(result);
      setFormData({});
      setProductType('none');
      if (currentUser.isAdmin === 'false') {
        setError('Thanks for uploading! Our admin will review your item and get back to you shortly.')
      }
      setError('Form submitted successfully!');
    } catch (error) {
      setError('error.message');
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <div className="text-center font-semibold text-xl m-3">
        <h1>Sell your Products</h1>
      </div>
      <div className="sm:flex flex-col md:flex-row justify-evenly items-start gap-4">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-4">
          <div className="flex flex-wrap gap-4">
            <label htmlFor="productType">Choose a product type:</label>
            <select id="productType" name="productType" value={productType} onChange={handleChange}>
              <option value="none">Choose</option>
              <option value="mobile">Mobile</option>
              <option value="Computer">Computer</option>
              <option value="CPU">CPU</option>
            </select>

            <input
              type="text"
              id="name"
              placeholder="Name of the Product..."
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />

            <input
              type="number"
              id="regularPrice"
              placeholder="Price..."
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />

            <div className="flex items-center justify-center">
              <label>in(GB):</label>
              <input
                type="number"
                id="RAM"
                placeholder="RAM..."
                className="w-full p-2 border border-gray-300 rounded mr-3"
                onChange={handleChange}
                required
              />
              <label>in(GB):</label>
              <input
                type="number"
                id="ROM"
                placeholder="ROM..."
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="block mb-1 w-[50%] text-white cursor-pointer text-center rounded-full py-1 bg-gray-500"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded hidden"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="discountedprice" className="mr-2">Discount</label>
            <input
              type="checkbox"
              name="discountedprice"
              onChange={handleCheckboxChange}
              className="mr-2"
            />
          </div>

          {showDiscountedPrice && (
            <input
              type="number"
              id="discountedPrice"
              required
              placeholder="Discounted Price..."
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          )}

          {currentUser ? (
            <button
              type="submit"
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          ) : (
            <Link to={'/signin'}>
              <p className="text-red-600 text-center">Log-in before uploading the product!</p>
            </Link>
          )}
        </form>

        {received && (
          <div>
            <p>Preview</p>
            <img className="h-64" src={received?.image} alt="Uploaded Product" />
          </div>
        )}
      </div>
      {error && <p className="text-green-600 text-center">{error}</p>}
    </>
  );
};

export default Upload;
