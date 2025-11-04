import React from 'react'
import Sidebar from '../components/Sidebar'
import news from '../assets/news.json'

const News = () => {
    return (
        <div className='market w-screen h-screen bg-neutral-950 flex text-neutral-50 '>

            <div className="sidebar  w-1/6 h-full bg-neutral-800 justify-center flex flex-col " >

                <Sidebar />
            </div>

            {/* {console.log(news)} */}

            <div className="overview  w-5/6   h-screen ">
                <div className='search flex justify-around mt-2 p-3 h-55  '>
                    <div className='w-100 mx-2 text-neutral-50  bg-neutral-800 flex flex-col p-1 '>
                        <img src={news[0].image_url} alt="" className='h-2/3 self-center' /> <a href={news[0].url} target='_blank' > {news[0].title}</a>
                    </div>

                    <div className='w-100 mx-2   bg-neutral-800 flex flex-col p-1 '>
                        <img src={news[1].image_url} alt="" className='h-2/3 self-center' /> <a href={news[1].url} target='_blank' >{news[1].title} </a>
                    </div>

                    <div className='w-100 mx-2  bg-neutral-800 flex flex-col p-1 '>
                        <img src={news[2].image_url} alt="" className='h-2/3 self-center' /> <a href={news[0].url} target='_blank' >{news[2].title}</a>
                    </div>

                </div>

                {/* Second Row */}

                <div className='graph min-h-1/2 bg-neutral-800 p-2 mx-10 my-4 w-4xl flex   '>
                    <div className='w-100 mx-2  bg-neutral-800 flex flex-col p-1 '>
                        <img src={news[3].image_url} alt="" className='h-3/4 self-center' /> <a href={news[0].url} target='_blank' >{news[3].title}</a>
                    </div>

                    <div className='w-100 mx-2  bg-neutral-800 flex flex-col p-1 '>
                        <img src={news[5].image_url} alt="" className='h-2/3 self-center' /> <a href={news[0].url} target='_blank' >{news[5].title}</a>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default News