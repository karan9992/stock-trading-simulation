import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify'


const LoginSection = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState(null)



    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            email,
            password
        }

        console.log("Submitted :", data);

        axios.post("http://localhost:3000/api/users/login", data)
            .then(response => {

                console.log(response.data);
                //setMsg("success")
                toast.success("Log in successful")
                console.log("id :", response.data.id);
                sessionStorage.setItem("id", response.data.id)
                sessionStorage.setItem("userName", response.data.userName)


                navigate("/market")

            })
            .catch(err => {
                console.log("ERROR", err);
                //setMsg("error")
                toast.error('Invalid credentials');
            })

    }
    return (
        <div className="signup-section">
            {msg === 'success' && (
                <div style={{ color: 'green', fontSize: 35, fontWeight: 400 }}>Login Successfull!</div>
            )}
            {msg === 'error' && (
                <div style={{ color: 'red', fontSize: 35, fontWeight: 400 }}>Wrong Credentils !</div>
            )}
            <h1>Login to Your Trading Account</h1>
            {/* <p>Join the simulation and practice trading with real market data – risk free.</p> */}

            <form className="signup-form" onSubmit={handleSubmit}>



                <div className="input-group">

                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="signup-btn">Login</button>
            </form>
        </div>
    )
}

export default LoginSection