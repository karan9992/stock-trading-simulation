import React from 'react'

const About = () => {
  return (
    <div className='market w-screen h-screen bg-neutral-950 flex text-neutral-400 '>



      <div className="overview w-screen  h-screen ">
        <p className='text-4xl text-cyan-400 text-center mt-3 '>About</p>
        <p style={{ fontSize: "25px" }} className='text-6xl tracking-wider text-neutral-200 p-12'>TradeX is a web-based platform designed to simplify stock market trading using real-time data and visualization.
          It enables users to track, analyze, and trade stocks efficiently with transparency and ease.
          Built with the MERN stack, it offers seamless integration of front-end and back-end .
          TradeX aims to make trading smarter and more accessible for beginners and experienced traders alike.
        </p>

        <p className='text-4xl text-cyan-400 text-center m-1 '> Our Team </p>
        <div className=' flex justify-around mt-10 p-3 h-64  '>
          <div className='w-100 mx-2 text-amber-400  bg-neutral-500 text-center  p-5 text-2xl '  style={{fontSize: "35px"}}> Karan

          </div>
          <div className='w-100 mx-2 text-amber-400  bg-neutral-500 text-center p-5 text-2xl '  style={{fontSize: "35px"}}>
            Saloni
          </div>
          <div className='w-100 mx-2 text-amber-400  bg-neutral-500 text-center p-5 text-2xl'  style={{fontSize: "35px"}}>Sonali</div>
          <div className='w-100 mx-2 text-amber-400  bg-neutral-500 text-center p-5 text-2xl'  style={{fontSize: "35px"}}>Khushi</div>


        </div>





      </div>
    </div>

  )
}

export default About