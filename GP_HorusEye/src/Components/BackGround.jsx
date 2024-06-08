
import '../Components/BackGround.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BackGround(){
    return(<>



<div className="Silder carousel slide" id="carouselExampleAutoplaying col-8"  data-bs-ride="carousel">
    <div className="carousel-inner ">
        <div className="carousel-item  IMAGE bg-img-1 active"> 
        <p className='Welcome_img_1'>
         Welcome to Horus Eye
         <br></br>
         See Egypt with new Eyes.
         </p>
        </div>

        <div className="carousel-item IMAGE bg-img-2">

        <div className='Welcome_img_1'>
        Hours eye is a friendly 
        <br></br>
        AI travel Agent
        </div>

        </div>
        <div className="carousel-item IMAGE bg-img-3">
        <div className='Welcome_img_1 '>
        Hours eye helps you to 
        <br></br>
        Know more about acient Egypt
        </div>
        </div>
    </div>
    </div>

     




     
    <div className='WEL'>
        <img  className="P1"src='/public/Group 4.png' ></img>
        <h1> Welcome to our innovative travel platform, where adventure meets personalization, and exploration knows no bounds</h1>
</div> 
<div className='WEL1'>
        <h1> Welcome to our innovative travel platform, where adventure meets personalization, and exploration knows no bounds</h1>
        <img  className=" P1 "src='/public/travel.jpg' ></img>
</div> 
<div className='WEL'>
        <img  className=" P1 "src='/public/travel.jpg' ></img>
        <h1> Welcome to our innovative travel platform, where adventure meets personalization, and exploration knows no bounds</h1>
</div> 






<Container className='CONtanier '>
    <Row  className='CONtanier'>
        <Col><div className='COL'>
            <h5>Personalized Travel Recommendations</h5>
            <p>The system takes into account the user's personal interests, such as historical
                sites, cultural experiences, adventure, etc. Machine learning algorithms analyze
                user preferences and behaviors to provide tailored recommendations.</p>
        </div></Col>
        <Col ><div  className='COL '><h5>Personalized Travel Recommendations</h5>
            <p>The system takes into account the user's personal interests, such as historical
                sites, cultural experiences, adventure, etc. Machine learning algorithms analyze
                user preferences and behaviors to provide tailored recommendations.</p></div></Col>
        <Col ><div  className='COL'><h5>Personalized Travel Recommendations</h5>
            <p>The system takes into account the user's personal interests, such as historical
                sites, cultural experiences, adventure, etc. Machine learning algorithms analyze
                user preferences and behaviors to provide tailored recommendations.</p></div></Col>
    </Row>
</Container>
    

    <footer className='Footer'>
        
       
    </footer>

    </>)

}export default BackGround