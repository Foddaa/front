import '../Login/Logon.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock} from "react-icons/fa";
import { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';


function Login(){
    const { Email, setEmail } = useContext(GlobalContext);
    const [TestEmail , SetTestEmail] = useState("")
    const [Password ,SetPassword] = useState("")
    let navigate=useNavigate()
    const [response , Setresponse] = useState("")

/////////////////////////////////////////////////////////
//////////FETCH//////////////////////////////////////////
    

    const formSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:8080/user/login', null,{
            params:{
            email: TestEmail,
            password: Password
        }}   ).catch(error => {
                console.error(error);
            }).then((res)=> {
                console.log(res.data)
                Setresponse(res.data)
                if((res.data) == 1){
                    setEmail(TestEmail)
                    navigate('/')
                }
            })     
    }
    return(
        <>
        <form className="LoginBackGround" onSubmit={formSubmit}>
            <div className="Wrapper">
        <div action="" >
            <h1 className='h'>Login</h1>
            <div className='InputBox'>
                <input type='text' placeholder='Username' required onChange={(e) => SetTestEmail(e.target.value) }></input><FaUser className='icon'/>
            </div>
            <div className='InputBox'>
                <input type='password' placeholder='Password' required onChange={(e) => SetPassword(e.target.value) }></input><FaLock className='icon'/>
            </div>
            <button type="submit" className='LOG'>Login</button>
            <div className='RegLink'>
            <p style={{ color: 'rgb(196, 12, 12)' }}>{response}</p>
        <p>Do not have an account? <Link to='/SignUp'>Regiter</Link></p>
            </div>
        </div>
        </div>
    </form>        
        </>
    )

}export default Login;