import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';



const BtnNav = ({ name, icon, click }) => {
    const navigate= useNavigate()
    return (
        <>
           
                <button className='p-3 w-50 m-1 rounded-lg text-2xl font-thin text-neutral-50 hover:bg-neutral-400 hover:text-black flex items-center ' 
                onClick={()=> {
                    console.log(click)
                    if(click=="logout"){
                        sessionStorage.clear()
                        toast("User logged out successfully                        git push origin main")
                        navigate("/")
                    } else{
                    navigate(click)
                    }
                }} >
                     <div className='mr-8'>{icon}</div> {name}</button>

                   
                    
          
        </>
    )
}

export default BtnNav