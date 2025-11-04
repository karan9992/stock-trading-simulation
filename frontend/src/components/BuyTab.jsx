import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";


const BuyTab = ({ isOpen, onClose, tradeBtn, info }) => {
    if (!isOpen) return null;
    const [qty, setQty] = useState(1)
    const [msg, setMsg] = useState(null)


    const handleTransaction = () => {

        if(!sessionStorage.getItem('id')){
            // alert("Plz Login")
            toast.warning("Plz Login")
        }

        let data = {
            stockName: info.name,
            nseName: info.nseName,
            type:tradeBtn.toLowerCase(),
            qty: qty,
            price: info.price,
            uid:  sessionStorage.getItem('id')          //"68efc95003e7788396357108"
        }

        console.log(`${info.name} ${tradeBtn.toLowerCase()}  ${info.price} x ${qty} = ${info.price * qty} `);

        axios.post(`http://localhost:3000/api/users/trade/${tradeBtn.toLowerCase()}`, data)
            .then(response => {

                // console.log(response.data);
                console.log("DATA :", response);
                setMsg(tradeBtn.toLowerCase())
                sessionStorage.removeItem("updatedStock")
                
                if(tradeBtn.toLowerCase() =="buy"){
                toast.success("Stock added To Portfolio Successfully!")
                }
                else{
                toast.success("Stock Sold from Portfolio Successfully!")

                }

                //sessionStorage.setItem("id", response.data.result._id)

            })
            .catch(err => {
                console.log("ERROR", err);
                setMsg("error")
            })
    }

    return (


        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            {/* style={{
                background: "white", height: 250, width: 440, margin: "auto", padding: "2%", border: "2px solid #000", borderRadius: "10px", boxShadow: "2px solid black"
            }} */}

            <div className='h-auto bg-neutral-400 w-[50%] rounded-xl  '
                style={{
                    background: "rgba(200,200,200,1)", margin: "auto", padding: "2px", border: "2px solid #000", borderRadius: "10px", boxShadow: "2px solid black", fontSize: '30px', color: "black"
                }}   >


                <button onClick={onClose} style={{ position: "relative", top: "5px", left: "95%", color: "#eb1d0e", fontWeight: 600, fontSize: 30 }}>X</button>

                {/* {msg && <span>Stock added To Portfolio Successfully!</span>} */}
                {/* {msg === 'buy' && (
                    <div style={{ color: 'green', fontSize:35, fontWeight:600 }}>Stock added To Portfolio Successfully!</div>
                )}
                {msg === 'sell' && (
                    <div style={{ color: 'red', fontSize:35, fontWeight:600 }}>Stock Sold from Portfolio Successfully!</div>
                )}
                {msg === 'error' && (
                    <div style={{ color: 'red' , fontSize:35, fontWeight:600}}>ERROR while transacting  !</div>
                )} */}

                <div className='input-container border-1 m-3 p-3'>
                    <div>
                        Name :<input className=' border-1 rounded-sm m-1 mx-3 p-1' type='text' name='qty' value={info.name} />        </div>
                    <div className='flex mt-10'>
                        <div>
                            Qty : <input className=' border-1 rounded-sm m-1 p-1 mx-3' type='number' name='qty' onChange={(e) => setQty(e.target.value)} />
                        </div>
                        <div>
                            Price : <input className=' border-1 rounded-sm m-1 p-1 mx-3' type='number' name='qty' value={info.price} />
                        </div>
                    </div>
                </div>
                {console.log(info)}

                <div className='input-container flex border-1 m-1 mx-3 p-3 mb-5'>

                    <div className='flex align-center justify-around w-1/3 '> <span  > Total  =  </span> &nbsp; <span>{info.price * qty}</span> </div>

                    <div className=' flex justify-end w-3/4'>
                        <button className='bg-gray-600 text-3xl text-neutral-50 p-2 w-25 mx-2 rounded-sm font-thin hover:bg-gray-700' onClick={handleTransaction}>{tradeBtn}</button>
                        <button className='bg-neutral-500 text-3xl text-neutral-50 p-2 w-25 rounded-sm font-thin hover:bg-neutral-600' onClick={onClose}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>



    )
}

export default BuyTab