import React, { useEffect, useState } from 'react'
import stock from '../assets/stocjDataObj.json'
import { IoIosSearch } from "react-icons/io";
import Sidebar from '../components/Sidebar';
import BuyTab from '../components/BuyTab';

const Market = () => {

    const API = import.meta.env.VITE_API_KEY;

    const [open, setOpen] = useState(false);
    const [tradeType, setTradeType] = useState("")

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const [stockData, setStockData] = useState(stock)
    const [search, setSearch] = useState("")
    const [pAv, setPAV] = useState(stock.keyMetrics.priceandVolume)
    const [reqStockData, setReqStockData] = useState({
        name: stockData.companyName,
        nseName: stockData.companyProfile.exchangeCodeNse,
        price: stockData.currentPrice.NSE
    })

    const [showFullDesc, setShowFullDesc] = useState(false);

    const getFirstLine = (desc) => {
        if (!desc) return "";
        const lines = desc.split('.');
        return lines[0];
    };

    const handleSearch = () => {
        console.log("Search :", search);
        getData();

    }



    const getData = async () => {

        try {
            const response = await fetch(`https://stock.indianapi.in/stock?name=${search}`, {
                headers: {
                    'x-api-key': import.meta.env.VITE_API_KEY
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            console.log(response);
            const result = await response.json();
            setStockData(result)
            setPAV(result.keyMetrics.priceandVolume)
            setReqStockData({
                name: result.companyName,
                nseName: result.companyProfile.exchangeCodeNse,
                price: result.currentPrice.NSE
            })
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    }

    //getData();

    useEffect(() => {

    }, [])

    return (
        <div className='market w-screen h-screen bg-neutral-950 flex text-neutral-400 '>

            <div className="sidebar  w-1/6 h-full bg-neutral-800 justify-center flex flex-col " >

                <Sidebar />
            </div>

            <div className="overview  w-5/6   h-screen overflow-y-scroll ">
                <div className='search flex justify-center items-center mt-2'>

                    <input type="search" name="search" id="" placeholder='search stocks'
                        className=' border-0 text-2xl p-3 text-black m-2 rounded-4xl bg-neutral-50 ocus:outline-none'
                        onChange={(e) => setSearch(e.target.value)} />

                    <button className='bg-neutral-500 flex justify-center items-center p-3 rounded-xl m-2 text-neutral-300 text-xl hover:bg-neutral-600' onClick={handleSearch}> <IoIosSearch /> Search </button>

                </div>

                <div className='graph min-h-1/2 bg-neutral-700 p-10 mx-10 my-4 w-4xl text-neutral-200 '>

                    {/*  stock api */}
                    <div className='border-1 rounded-sm p-3 m-1'>
                        <span className='text-2xl text-neutral-100  rounded-sm p-1 m-3'
                            style={{ fontSize: 35 }}>
                            <span style={{ fontSize: 39, padding: 2, fontWeight: 300, color: "#FFDB58", boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.4)', borderRadius: "5px" }}> {stockData.companyName ? stockData.companyName :"Company name" } </span>&nbsp;&nbsp;
                            <span style={{ fontSize: 39, padding: 2, fontWeight: 200, color: "#AFDF58", boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.4)', borderRadius: "5px" }}>  {stockData.currentPrice.NSE} ₹
                            </span>
                            &nbsp;&nbsp; NSE : {stockData.companyProfile.exchangeCodeNse}
                            {/*pAv[2].value} %   &nbsp;&nbsp; {pAv[2].displayName */}  </span>


                        <div className=' p-1 m-3' style={{ fontSize: 35 }}>
                            <p style={{ fontSize: 30 }}>NSE : {stockData.currentPrice.NSE} &nbsp; BSE : {stockData.currentPrice.BSE}</p>
                            <p style={{ fontSize: 30 }}>
                                {pAv[0].displayName}  :  {pAv[0].value} Cr  <br />
                                {pAv[18].displayName} :  {pAv[18].value} &nbsp; &nbsp; &nbsp; &nbsp;
                                {pAv[19].displayName} :  {pAv[19].value}
                                {/*console.log(pAv)*/}

                            </p>
                        </div>
                    </div>
                    {/* <span className='text-2xl text-neutral-100 border-1 rounded-sm p-1 m-1' 
                    style={{fontSize:35}}>
                         {stockData.currentPrice.NSE} &nbsp;&nbsp;
                        {pAv[2].value} %   &nbsp;&nbsp; {pAv[2].displayName}  </span>
                    <p> {stockData.companyName} &nbsp; NSE : {stockData.companyProfile.exchangeCodeNse} </p>

                    <p>NSE : {stockData.currentPrice.NSE} &nbsp; BSE : {stockData.currentPrice.BSE}</p>
                    <p>
                        {pAv[0].displayName}  :  {pAv[0].value} Cr &nbsp;&nbsp;
                        {pAv[18].displayName} :  {pAv[18].value} &nbsp;&nbsp;
                        {pAv[19].displayName} :  {pAv[19].value} &nbsp;&nbsp;
                        {/*console.log(pAv)}

                    </p> */}

                    <hr />
                    {/* <p> Description : {stockData.companyProfile.companyDescription}</p> */}
                </div>

                <div className='border-2 p-5 m-10'>
                    {!showFullDesc ? (
                        <>
                            <span>
                                {getFirstLine(stockData.companyProfile.companyDescription)}
                            </span>
                            <button
                                className="ml-2 text-blue-400 underline"
                                onClick={() => setShowFullDesc(true)}
                            >
                                Read more
                            </button>
                        </>
                    ) : (
                        <>
                            { stockData.companyProfile.companyDescription  }
                            <button
                                className="ml-2 text-blue-400 underline"
                                onClick={() => setShowFullDesc(false)}
                            >
                                Show less
                            </button>
                        </>
                    )}
                </div>

                <div className='btn-BS  mt-4 flex justify-center '>
                    <button className='bg-red-600 text-3xl text-neutral-50 p-2 w-75 mx-8 rounded-2xl font-thin  hover:bg-red-800 '
                        onClick={() => { handleOpen(); setTradeType('Sell') }}>SELL</button>

                    <button className='bg-green-600 text-3xl text-neutral-50 p-2 w-75 mx-8 rounded-2xl font-thin hover:bg-green-800'
                        onClick={() => { handleOpen(); setTradeType('Buy') }}>BUY</button>

                    <BuyTab isOpen={open} onClose={handleClose} tradeBtn={tradeType} info={reqStockData} />


                </div>

            </div>
        </div>
    )
}

export default Market