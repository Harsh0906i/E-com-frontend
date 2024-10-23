import React, { useEffect, useState } from "react";
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import Item from '../Component/Item';
import { Link } from "react-router-dom";
import Carousel from "../Component/Carousel";

export default function Home() {
  const [mobileItem, setMobileItem] = useState([]);
  const [computerItem, setComputerItem] = useState([]);
  const [electronicsItem, setElectronicsItem] = useState([]);
  const [loading, setLoading] = useState(false);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    async function fetchMobile() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8080/api/item/get?mobile=true&computer=false&CPU=false&All=true&limit=4');
        const data = await res.json();
        setMobileItem(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchComputer() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8080/api/item/get?searchTerm=&mobile=false&computer=true&CPU=false&All=true&limit=8');
        const data = await res.json();
        setComputerItem(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCPU() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:8080/api/item/get?searchTerm=&mobile=false&computer=false&CPU=true&All=true&limit=4');
        const data = await res.json();
        setElectronicsItem(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMobile();
    fetchComputer();
    fetchCPU();
  }, []);

  return (
    <>
      {loading ? (
        <h1 className="text-xl text-center">Loading...</h1>
      ) : (
        <>
          <Carousel computer={computerItem} />

          <div className='flex items-center justify-evenly  w-full flex-col gap-8 my-10'>
            {mobileItem.length > 0 && (
              <div>
                <div className='mb-5 ml-8'>

                  <h2 className='text-2xl font-semibold text-slate-600'>Mobiles</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?mobile=true&CPU=false&All=true'}>Show more</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {mobileItem.map((mobile) => (
                    <Item item={mobile} key={mobile._id} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center justify-evenly  w-full flex-col gap-8 my-10'>
            {electronicsItem.length > 0 && (
              <div>
                <div className='mb-5 ml-8'>

                  <h2 className='text-2xl font-semibold text-slate-600'>CPU</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?CPU=true&All=true'}>Show more</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {electronicsItem.map((e) => (
                    <Item item={e} key={e._id} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center justify-evenly w-full flex-col gap-8 my-10'>
            {computerItem.length > 0 && (
              <div>
                <div className='mb-5 ml-8'>
                  <h2 className='text-2xl font-semibold text-slate-600'>Computers</h2>
                  <Link className='text-sm text-blue-800 hover:underline' to={'/search?computer=true&All=true'}>Show more</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {computerItem.map((e) => (
                    <Item item={e} key={e._id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
