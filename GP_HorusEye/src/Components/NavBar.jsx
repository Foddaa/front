import { Link, Navigate } from 'react-router-dom'
import '../Components/NavBar.css'
import '/public/Group 4.png'
import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

function NavBar() {
  const { Email, setEmail } = useContext(GlobalContext);
  const [logedin, setLogedin] = useState(Email !== null);

  useEffect(() => {
    localStorage.setItem('Email', JSON.stringify(Email));
    setLogedin(Email !== null); // Update logedin state based on Email state
  }, [Email]);

  const logOut = () => {
    setEmail(null);
    setLogedin(false);
  };

  return (
    <div className="container-fluid  NAV ">
      <Link to="/" className="navbar-brand IMG" href="#" alt="Bootstrap" width="25" height="25">
        <img src='/public/Group 4.png' />
      </Link>
      <div className='middle_elements'>
      <Link to='/LandMark' className="navbar-brand NAVi" href="#" >
          <p className='NAVi'>LandMark</p>
        </Link>
        <Link to='/HorusEye' className="navbar-brand NAVi" href="#" >
          <p className='NAVi'>Horus eye</p>
        </Link>
        {logedin && <Link to='/Booking' className="navbar-brand NAVi" href="#" >
          <p className='NAVi'>Booking</p>
        </Link>}
        {logedin && <Link to="/FAV" className="navbar-brand NAVi" href="#" >
          <p className='NAVi'> Favourites</p>
        </Link>}
        {logedin && <Link to="/ViewHistory" className="navbar-brand NAVi " href="#"  >
          <p className='NAVi'>History</p>
        </Link>}
        {!logedin && <Link to="/Login" className="navbar-brand NAVi " href="#" >
          <p className='NAVi'>Login</p>
        </Link>}
        {logedin && <Link onClick={logOut} to="/" className="navbar-brand NAVi " href="#" >
          <p className='NAVi'>LogOut</p>
        </Link>}
      </div>
    </div>
  )
}

export default NavBar;
