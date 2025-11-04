import React from 'react'

import { RiHome2Line, RiStockLine, RiBookShelfLine, RiUser3Fill, RiLogoutBoxLine } from "react-icons/ri";

import BtnNav from '../components/BtnNav';
import { IoNewspaperOutline } from "react-icons/io5";
const Sidebar = () => {
  return (
    <>
      <div className="icon justify-items-center mb-10 ">

        <RiUser3Fill className='text-4xl text-neutral-50' />
        <p className='text-2xl font-thin text-neutral-50 mt-2'>{sessionStorage.getItem("userName") ? sessionStorage.getItem("userName").toUpperCase() : "user"}</p>


      </div>
      <div className="nav-buttons  items-center flex flex-col ">


        <BtnNav name={"Home"} icon={<RiHome2Line />} click={"/"} />
        <BtnNav name={"Market"} icon={<RiStockLine />} click={"/market"} />
        <BtnNav name={"Portfolio"} icon={<RiBookShelfLine />} click={"/portfolio"} />
        <BtnNav name={"News"} icon={<IoNewspaperOutline />} click={"/news"} />
        <BtnNav name={"Logout"} icon={<RiLogoutBoxLine />} click={"logout"} />



      </div>
    </>
  )
}

export default Sidebar