// PortfolioTable.jsx
import React, { useState } from "react";
import BuyTab from "./BuyTab";

const portfolio =
    [
        { stockName: "AAPL", qty: 10, price: 150, pl: -234 },
        { stockName: "TSLA", qty: 5, price: 250, pl: 400 },
        { stockName: "MSFT", qty: 8, price: 280, pl: -800 },
        { stockName: "NVDI", qty: 20, price: 40, pl: 980 }
    ];

export default function PortfolioTable({ holdings }) {
    //const portfolio =holdings.portfolioData;
    const [open, setOpen] = useState(false);
    const [tradeType, setTradeType] = useState("")
    const [sellData, setSellData]= useState(null)

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div className=" m-3 ">
            
            {console.log("From porttfolio table holdings:", holdings)}
            <h1 className="text-3xl  mb-6 text-center text-neutral-100 font-light">My Portfolio</h1>
            <div className="overflow-y-auto bg-neutral-700 rounded-2xl p-3 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 " style={{ maxHeight: "350px", overflowY: "auto" }}>
                <table className="table-auto border-collapse  p-5  w-full text-center ">
                    <thead className="">
                        <tr>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700  border-gray-300 px-4 py-3 text-green-400 text-3xl font-bold ">Symbol</th>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700  border-gray-300 px-4 py-3 text-green-400 text-3xl font-light ">Quantity</th>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700 border-gray-300 px-4 py-3 text-green-400 text-3xl font-light ">Price</th>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700 border-gray-300 px-4 py-3 text-green-400 text-3xl font-light ">Investment</th>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700  border-gray-300 px-4 py-3 text-green-400 text-3xl font-light ">Total P/L</th>
                            <th style={{ fontWeight: 300, fontSize: 25 }} className="bg-neutral-700  border-gray-300 px-4 py-3 text-green-400 text-3xl font-light "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings?.map((stock, index) => (
                            <tr key={index} className="hover:bg-neutral-800">
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-4 font-medium text-neutral-200">
                                    {stock.name}
                                </td>
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-4 text-neutral-200">
                                    {stock.qty}
                                </td>
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-5 text-neutral-200">
                                    {stock.oldPrice.toFixed(1)} ₹
                                </td>
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-4 text-neutral-200 ">
                                    {(stock.oldPrice * stock.qty).toFixed(1)} ₹
                                </td>
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-4  text-neutral-200">
                                    {((stock.newPrice * stock.qty) - (stock.oldPrice * stock.qty)).toFixed(1)} ₹
                                </td>
                                <td className="border-0 border-t-1 border-gray-300 px-4 py-4  text-neutral-200">
                                    <button className="text-neutral-200 bg-red-500  p-1 px-3 rounded-md hover:bg-red-700"
                                        onClick={(e) => {
                                            console.log(index, stock)
                                            setSellData({
                                                price:stock.newPrice,
                                                nseName : stock.name,
                                                qty: stock.qty,
                                                name: stock.name
                                            }  )
                                            handleOpen(); setTradeType('Sell')

                                    }}>SELL</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                                                {< BuyTab isOpen = { open } onClose = { handleClose } tradeBtn = { tradeType } info = { sellData } />}

            </div>
        </div>
    );
}
