import React from 'react'
import { Link } from "react-router-dom";

export default function Item({ item }) {
    return (
        <div className="bg-white shadow-md shadow-gray-600 hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/item/${item._id}`}>
                <img src={item.image} alt="Photo" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
                <div className="p-3 flex flex-col gap-2 w-full truncate">
                    <p className="text-lg font-semibold text-slate-700 truncate ">{item.name}</p>

                    <p className="text-sm text-gray-600 truncate">
                        {item.storage.RAM} GB
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {item.storage.ROM >= 1024 ? `${item.storage.ROM / 1024}TB` : `${item.storage.ROM} GB`}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        <span className='font-semibold'>Regular price : </span> <span className='line-through'>₹{item.regularPrice}</span>
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        <span className='font-semibold'>Discounted price : </span>₹{item.discountedPrice}
                    </p>
                </div>
            </Link>
        </div>
    )
}
