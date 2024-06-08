import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './ViewHotelDetails.css'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
import { useNavigate } from "react-router";
import { CheckInState, CheckOutState, RoomState} from "./Booking";
import { GlobalContext } from '../../context/GlobalContext';
/////////////////////////////////////////////////////////



function ViewHotelDetails (hotel) {
////////////////checkin,checkOut,Room from Booking////////////
const { Email, setEmail } = useContext(GlobalContext);


   let checkIn= useRecoilValue(CheckInState)
   let checkOut= useRecoilValue(CheckOutState)
   let Room= useRecoilValue(RoomState)
   //EmailFromSignUp
   console.log(Email)

////////////////////////////////////////////////////////// 
    let navigate = useNavigate()

    const BackPage =() =>{
        navigate('/Booking')
    }

    const ConfirmationBooking =(Hotel)=>{
        Swal.fire ({
            title: 'Are sure to confirm this Book?',
            html: `
          <h3>Hotel Name: ${Hotel.name}</h3>
          <P>Location: ${Hotel.city}</p>
          <p>Price: ${Hotel.price}</p>
          <p>checkIn: ${checkIn}</p>
          <p>checkOut: ${checkOut}</p>
          <p>Room :${Room}</p>
          <p>Rating: ${Hotel.rating}</p>
          <p>Description: ${Hotel.description}</p>
        `,
             confirmButtonText: 'OK',
            showCancelButton:true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#d33',
        })
        .then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Booked!', 'Your booking has been confirmed, check your email', 'success')
                 ///////////////////POST BOOKING FOR STATIC DATA//////////////////////
        axios.post ('url', {
            hotelName: hotel ,
            City: city,
            CheckIN: checkIn,
            CheckOut: checkOut,
            Room: room,
            price:price
        })}})}



    let {HotelID} = useParams();
    const [Hotel ,SetHotel ]=useState([])
    useEffect(() =>{
        axios.get (`http://localhost:3000/product/${HotelID}`)
        .then((Hotel)=>{
            SetHotel(Hotel.data)
            console.log(Hotel);
        })
    },[HotelID])

    return(<>
    <div className="BG">
        <div className="HotelDetails">
    <h1>Hotel name: {Hotel.name}</h1>
    <div className="ImageHotel"></div>
                <h2>Location: {Hotel.city}</h2>
                <h2>Price: {Hotel.price}</h2>
                <h2>Rating: {Hotel.rating}</h2>
                <h2>Description: {Hotel.description}</h2>
                <div className="Btnss">
                <button className="btnBook" onClick={()=>{ConfirmationBooking(Hotel)}}>Book</button>
                <button className="btnBook" onClick={()=>{BackPage()}}>Back</button>
                </div>
                </div>
    </div>
        </>
    )

}export default ViewHotelDetails;