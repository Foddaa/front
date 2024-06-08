import '../SignUp/SignUp.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser} from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import PopUp from '../PopUp/Popup';
import { testEmail } from '../../Components/atom';
//////////////////////////////////////////////////////

//////////////////////
function SignUp(){
   // const inputRef = useRef();
    const [testedEmail,setTestedEmail]=useRecoilState(testEmail)
    const [FristName , SetFristName]=useState("")
    const [LastName , SetLastName]=useState("")
    const [Mobile , SetMobile]=useState("")
    const [Brithday , SetBrithday]=useState("")
    const [Country , SetCountry]=useState("")
    const [AlreadyExist,setAlreadyExist]=useState(false)
    /* const [password, Setpassword]=useState("")
    const [Confrim , SetConfrim]=useState("")
    const [filee, Setfile]=useState("")*/
    let navigate=useNavigate()
    function onClose(){
        setAlreadyExist(false)  
    }
    
/*  /*const handleFileChange = (event) => {
        const file = event.target.files[0];
        const label = inputRef.current.previousSibling;
        label.textContent = file.name;
        Setfile(event.target.files[0]);
        
    };*/
    
    const SignSubmit =(e) =>{
        e.preventDefault()

        axios.post('http://localhost:8080/user/newToken', {
            email:testedEmail,
            firstName:FristName,
            lastName:LastName,
            phoneNumber:Mobile,
            birthDate:Brithday,
            country:Country
        })
          .catch(error => {
                console.error(error);
           })
          .then((res)=> {
            console.log(res.data)
            if((res.data) === 1){
                navigate('/VerifyPage')
            }else{
                setAlreadyExist(true)
            }
            })     
    }
        

               
   

    return(
    <>
    <form className="LoginBackGround" onSubmit={SignSubmit}>
    <Container fluid className="Wrapper" >
    
            <h1 className='h'>Sign Up</h1> 

            <Row>
            <Col><div className='InputBox'>
                <input type='text' placeholder='FristName' required onChange={(e) =>SetFristName(e.target.value)}></input><FaUser className='icon'/>
            </div>
            </Col>
            <Col> <div className='InputBox'>
            <input type='text' placeholder='LastName' required onChange={(e) =>SetLastName(e.target.value)}></input><FaUser className='icon'/>
            </div>
            </Col>
            </Row>
            
        <div className='InputBox'>
                <input type='email' placeholder='Email' required onChange={(e) =>setTestedEmail(e.target.value)}></input><FaUser className='icon'/>
            </div>
            
            <div className='InputBox'>
                <input type='text' placeholder='MobilePhone' required onChange={(e) =>SetMobile(e.target.value)}></input><MdOutlineNumbers className='icon'/>
            </div>
            
            <Row>
            <Col><div className='InputBox'>
                <input type='date' placeholder='brithday' required onChange={(e) =>SetBrithday(e.target.value)}></input>
            </div></Col>
        <Col> <div className='InputBox'>
                <input type='text' placeholder='Country ' required onChange={(e) =>SetCountry(e.target.value)}></input><BiWorld className='icon'/>
            </div></Col>
            </Row>
        
           <button type='submit' className='LOG'>Next</button>
        
    
        </Container>
    </form>
        {AlreadyExist && < PopUp message="this email is already signed" onClose={onClose}/>}
    </>
    );
    }export default SignUp;