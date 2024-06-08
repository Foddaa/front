import '../SignUp/SignUp.css'
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { FaLock} from "react-icons/fa";
import PopUp from '../PopUp/Popup';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { testEmail } from '../../Components/atom';
import { useRecoilState } from 'recoil';


function Password(){
    const [testedEmail,setTestedEmail]=useRecoilState(testEmail)
    const { Email, setEmail } = useContext(GlobalContext);
    const [Password, SetPassword]=useState("")
    const [Confirm , SetConfirm]=useState("")
    let navigate=useNavigate()
    const [PasswordNotIdentical,setPasswordNotIdentical]=useState(false)
    const [NotValid,setNotValid]=useState(false)


    function onClose(){
        setPasswordNotIdentical(false)  
        setNotValid(false)
    }

    const SignSubmit =(e) =>{
        console.log(Email);
        e.preventDefault()
        if(Password===Confirm){
            if (Password.length >= 8) {
        axios.post('http://localhost:8080/user/confirmPassword', null,{
            params:{
            email: testedEmail,
            password: Password
        } }  ).catch(error => {
                console.error(error);
            }).then((res)=> {
                if(res.data==true){
                    setEmail(testedEmail)
                    navigate('/')
                }
            })  }else{
                setNotValid(true)
            }   
        }else{
            setPasswordNotIdentical(true)
        }
    }
    return(
    <>
    <form className="LoginBackGround" onSubmit={SignSubmit}>
    <Container fluid className="Wrapper" >
    
            <h1 className='h'>Set Password</h1> 
            
        <div className='InputBox'>
                <input type='password' placeholder='password' required onChange={(e) =>SetPassword(e.target.value)}></input><FaLock className='icon'/>
            </div>
            <div className='InputBox'>
                <input type='password' placeholder='Confirm password' required onChange={(e) =>SetConfirm(e.target.value)}></input><FaLock className='icon'/>
            </div>
            <div className="InputBoxFile">
            
    </div>
        <button type='submit' className='LOG'>Create account</button>
        
    
        </Container>
    </form>
    {PasswordNotIdentical && < PopUp message="Passwords do not match." onClose={onClose}/>}
    {NotValid && < PopUp message="Password must be at least 8 characters long." onClose={onClose}/>}

    </>
    )
}export default Password;