import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router';


const SignupSection = () => {
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            userName,
            email,
            password
        }

        console.log("Submitted :", data);

        axios.post("http://localhost:3000/api/users/register", data)
            .then(response => {

                console.log(response.data);
                console.log("DATA :", response.data.result._id);
                // sessionStorage.setItem("id", response.data.result._id)
                //setMsg("success")
                toast.success("Sign up Successful ")
                
                
            })
            .catch(err => {
                console.log("ERROR", err);
                //setMsg("error")
                 toast.error("Sign up failed ")
            })

    }

    return (
        <div className="signup-section">
            <h1>Create Your Trading Account</h1>
            {/* <p>Join the simulation and practice trading with real market data – risk free.</p> */}
            {/* {msg === 'success' && (
                <div style={{ color: 'green', fontSize: 35, fontWeight: 400 }}>Sign up Successfull!</div>
            )}
            {msg === 'error' && (
                <div style={{ color: 'red', fontSize: 35, fontWeight: 400 }}>Wrong Credentils !</div>
            )} */}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="input-group">
                    <input type="text" placeholder="Username" required onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="tel" placeholder="number" />
                </div>
                <button type="submit" className="signup-btn">Sign up</button>
            </form>
        </div>
    )
}

export default SignupSection