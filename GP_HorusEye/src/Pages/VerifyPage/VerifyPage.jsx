import './Verifypage.css'
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import PopUp from '../PopUp/Popup';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { testEmail } from '../../Components/atom';


function VerifyPage() {
    const [testedEmail,setTestedEmail]=useRecoilState(testEmail)
    const [Code, SetCode]=useState("")
    const [CodeWrong,setCodeWrong]=useState(false)

    let navigate=useNavigate()
    function onClose(){
        setCodeWrong(false)  
    }

    const SignSubmit =(e) =>{
        e.preventDefault()
        axios.post('http://localhost:8080/user/assignCode', null,{
            params:{
            email: testedEmail,
            code: Code
        } }  ).catch(error => {
                console.error(error);
            }).then((res)=> {
                if((res.data) == true){
                    navigate('/Password')
                }else{
                    setCodeWrong(true)
                }
            })     
        }

    return (
        <>
        <form className="LoginBackGround" onSubmit={SignSubmit}>
    <Container fluid className="Wrapper" >
            <h1 className='h'>Email Validation</h1> 
            <h3 className='des'>please enter the code that sent to your email</h3>
         <div className='InputBox'>
            <input type='code ' placeholder='Enter code' required onChange={(e) =>SetCode(e.target.value)}></input>
            </div>
            
           <button type='submit'   to= {'/Home'} className='LOG'>Vaild</button>
        
    
        </Container>
        
    </form>
            {CodeWrong && < PopUp message="code is not true" onClose={onClose}/>}
            </>

    );
}export default VerifyPage;