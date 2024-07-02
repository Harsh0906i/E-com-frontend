import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import Item from '../Component/Item';
import { Link } from "react-router-dom";

export default function Home() {
  const [mobileItem, setMobileItem] = useState([]);
  const [computerItem, setComputerItem] = useState([]);
  const [electronicsItem, setElectronicsItem] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    async function fetchMobile() {
      try {
        const res = await fetch('https://e-backend-dps3pnj58-harshit-singh-aryas-projects.vercel.app/api/item/get?mobile=true&computer=false&CPU=false&All=true&limit=3');
        const data = await res.json();
        setMobileItem(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchComputer() {
      try {
        const res = await fetch('https://e-backend-dps3pnj58-harshit-singh-aryas-projects.vercel.app/api/item/get?searchTerm=&mobile=false&computer=true&CPU=false&All=true&limit=3');
        const data = await res.json();
        setComputerItem(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCPU() {
      try {
        const res = await fetch('https://e-backend-dps3pnj58-harshit-singh-aryas-projects.vercel.app/api/item/get?searchTerm=&mobile=false&computer=false&CPU=true&All=true&limit=3');
        const data = await res.json();
        setElectronicsItem(data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchMobile();
    fetchComputer();
    fetchCPU();
  }, []);
  return (
    <>
      <Swiper navigation>
        {computerItem.length > 0
          &&
          computerItem.map((computer) => (
            <SwiperSlide>
              <div style={{ background: `url(${computer.image}) center no-repeat`, backgroundSize: 'cover' }} className='h-[450px]' key={computer.image}></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {mobileItem.length > 0 && (
          <div>
            <div className='my-3'>
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
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {electronicsItem.length > 0 && (
          <div>
            <div className='my-3'>
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
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {computerItem.length > 0 && (
          <div>
            <div className='my-3'>
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
  );
}
