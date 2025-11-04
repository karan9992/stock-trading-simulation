import React, { useEffect, useState } from 'react'
import TopBlock from '../components/topBlock'
import PortfolioTable from '../components/PortfolioTable'
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const API = import.meta.env.VITE_API_KEY;


const Portfoilo = () => {
    const [portfolio, setPortfolio] = useState()
    const [totalPortfolio, setTotalPortfolio] = useState()
    const [uPL, setUPL] = useState()
    const [updatedPortfolio, setUpdatedPortfolio] = useState(JSON.parse(sessionStorage.getItem("updatedStock")))


    const getData = async (search) => {

        try {
            const response = await fetch(`https://stock.indianapi.in/stock?name=${search}`, {
                headers: {
                    'x-api-key': API
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);

            return result.currentPrice.NSE;

            // setStockData(result)
            // setPAV(result.keyMetrics.priceandVolume)
            // setReqStockData({
            //     name: result.companyName,
            //     nseName: result.companyProfile.exchangeCodeNse,
            //     price: result.currentPrice.NSE
            // })


        } catch (error) {
            console.error(error.message);
        }
    }




    const renderPortfolio = async () => {
        const id = sessionStorage.getItem('id')

        try {
            const response = await axios.get(`http://localhost:3000/api/users/trade/portfolio/${id}`);
            setPortfolio(response.data);
            console.log("POrtfolio response.data", response.data.portfolioData);
            let holding = response.data.portfolioData;

            // Fetch updated prices in parallel

            const stocks = await Promise.all(
                holding.map(async (stock) => {
                    const updatedPrice = await getData(stock.nseName);
                    console.log(updatedPrice);
                    return {
                        name: stock.nseName,
                        qty: stock.qty,
                        oldPrice: stock.avgBuyPrice,
                        newPrice: updatedPrice
                    };
                })
            );
            console.log("STOCKS :", stocks);
            setUpdatedPortfolio(stocks);

            sessionStorage.setItem("updatedStock", JSON.stringify(stocks))

            let tpf = stocks.reduce((sum, i) => sum + Number(i.newPrice * i.qty), 0);


            setTotalPortfolio(tpf)
            setUPL(tpf - portfolio.totalInvestment)

            console.log("stocks", stocks);
        } catch (err) {
            console.log("ERROR", err);
        }
    }

    useEffect(() => {




        console.log(sessionStorage.getItem("id"));
        if (sessionStorage.getItem("id")) {
            //get data 
            
            {
                renderPortfolio()
            }
        }

    }, [])

    return (
        <>
            <div className='portfolio w-screen h-screen bg-neutral-950 flex text-neutral-400 '>

                <div className="sidebar  w-1/6 h-full bg-neutral-800 justify-center flex flex-col " >

                    <Sidebar />

                </div>
                {console.log("data :", portfolio)}

                <div className="overview  w-5/6 ">
                    <div className="topBlocks p-2  h-1/4 flex justify-around ">
                        <TopBlock name={"Investment"} data={portfolio ? portfolio.totalInvestment.toFixed(1) : "loading"} />
                        <TopBlock name={"Total Portfolio"}
                            data={totalPortfolio ? totalPortfolio.toFixed(1) : "loading"}
                        />
                        <TopBlock name={"Unrealizefed P/L"}
                            data={totalPortfolio ? (totalPortfolio.toFixed(1) - portfolio.totalInvestment.toFixed(1)).toFixed(1) : "loading"}
                        />
                        <TopBlock name={"Balance"} data={portfolio ? portfolio.balance.toFixed(1) : "loading"} />

                    </div>
                    <div className="stockTable  h-3/4  p-6  ">
                        <div className='box-border h-full  rounded-xl'>
                            <PortfolioTable holdings={updatedPortfolio} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfoilo