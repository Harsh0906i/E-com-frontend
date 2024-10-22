import React, { useState } from "react";
import "./carousel.css";

const Carousel = ({ computer }) => {
    const [loading, setLoading] = useState(Array(computer.length).fill(true)); 

    const handleImageLoad = (index) => {
        const newLoadingState = [...loading];
        newLoadingState[index] = false; 
        setLoading(newLoadingState);
    };

    return (
        <>
            <div className="relative flex items-center justify-center py-8">
                <div className="flex overflow-x-auto space-x-6 w-full no-scrollbar">
                    {computer.map((Item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center m-2 flex-shrink-0 bg-white p-4 rounded-lg shadow-lg border w-[90%] sm:w-[75%] md:w-[60%] lg:w-[40%] xl:w-[30%]"
                            style={{ "borderRadius": "20px" }}
                        >
                            <div className="w-full flex justify-center h-[200px] sm:h-[250px] relative">
                                {loading[index] && (
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <div className="loader"></div> 
                                    </div>
                                )}
                                <img
                                    src={Item.image}
                                    className={`h-full w-full object-contain ${loading[index] ? 'opacity-0' : 'opacity-100'}`} 
                                    alt=""
                                    onLoad={() => handleImageLoad(index)} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Carousel;
