import  { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../components/Landing.css'
import LoginSection from '../components/LoginSection'
import SignupSection from '../components/SignupSection'


const Landing = () => {
    const [isLogin, setIsLogin]= useState(true) // for login or sign up section which to show
    const [loggedIn, setLoggedIn] = useState(false) // for login or sign up section hidden / visvible
    const changeLogin = ()=>{                   // for login or sign up section which to show
        setIsLogin(prev=>!prev)
    }

    useEffect(()=>{
       
        if( sessionStorage.getItem('id')){
            setLoggedIn(true)
        }
    },[])
    return (
        <>

            <div className='landing-bg'>


                <nav className="navbar">
                    <Navbar click={changeLogin} propLogin={isLogin} />
                </nav>
                <p className='title-text text-green-600 '>
                    Stock Market
                </p>
                <p className='title-subText text-neutral-200 ' >
                    Practice stock trading with virtual money.
                </p>

               {! loggedIn && <div className="login-container"> 
                    {isLogin ? <SignupSection /> : <LoginSection />  }
                </div>}




            </div>


        </>
    )
}

export default Landing