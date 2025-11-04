import React from 'react'

const TopBlock = ({name,data}) => {
  return (
    <div className=' w-100 m-4 rounded-2xl p-4  text-neutral-200 bg-white/10 backdrop-blur-3xl border border-white/10 shadow-md shadow-white/10'>
       
    <p className='text-4xl mt-3 ml-5'> ₹ {data}</p>
    <p className='text-lg mt-3 ml-4' > {name}</p>
    </div>
  )
}

export default TopBlock