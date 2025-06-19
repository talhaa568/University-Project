import { Button } from '@material-tailwind/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidnav() {
    const location =useLocation();
  return (
    <nav className="min-h-[740px] w-60 bg-gradient-to-b from-[#3aa3e9] to-[#3d63d1] rounded-lg ml-3 my-5 py-4 text-white px-1 fixed top-0 left-0 flex flex-col gap-4 shadow-lg font-poppins">
      <h2 className="text-xl font-bold mb-4 text-center rounded-lg py-3 bg-gradient-to-tl from-[#38b2e9] to-[#4572ef] shadow mx-4">NAVBAR</h2>
      <Button href="#" className={`hover:text-cyan-400 ${location.pathname==='/'?'text-cyan-400':'text-white'}  mx-3 py-4 text-left bg-gradient-to-r from-[#333d51] to-[#161a21]`}>Logic Gates</Button>
    </nav>
  );
}

export default Sidnav;
