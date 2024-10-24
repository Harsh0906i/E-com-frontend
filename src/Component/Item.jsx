import React from 'react'
import { Link } from "react-router-dom";

export default function Item({ item }) {
    return (
        <div className="bg-white shadow-md mx-auto shadow-gray-600 transition-shadow overflow-hidden rounded-lg w-[90%] sm:w-[280px]"
            style={{ "borderRadius": "15px" }}

        >
            <Link to={`/item/${item._id}`}>
                <img src={item.image} alt="Photo" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
                <div className="p-3 flex flex-col gap-2 w-full truncate">
                    <p className="text-lg font-semibold text-slate-700 truncate ">{item.name}</p>

                    <p className="text-sm text-gray-600 truncate">
                        ROM : {item.storage.RAM >= 1024 ? `${item.storage.RAM / 1024}TB` : `${item.storage.RAM} GB`}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        ROM : {item.storage.ROM >= 1024 ? `${item.storage.ROM / 1024}TB` : `${item.storage.ROM} GB`}
                    </p>
                    {
                        item.discountedPrice ?
                            <p className="text-sm text-gray-600 line-clamp-2">
                                <span className='font-semibold'>Regular price : </span> <span className='line-through'>₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}</span>
                            </p> : <p className="text-sm text-gray-600 line-clamp-2">
                                <span className='font-semibold'>Price : </span> <span className=''>₹{new Intl.NumberFormat('en-IN').format(item.regularPrice)}</span>
                            </p>
                    }
                    {
                        item.discountedPrice &&
                        <p className="text-sm text-gray-600 line-clamp-2">
                            <span className='font-semibold'>Discounted price : </span>₹{new Intl.NumberFormat('en-IN').format(item.discountedPrice)}
                        </p>
                    }

                </div>
            </Link>
        </div>
    )
}
