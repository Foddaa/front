import './FAV.css';
import { FaHeart } from "react-icons/fa";
import { useState,useEffect,useRef } from 'react';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';


function FAV(){
    const [landmarks, setLandmarks] = useState('');
    const { Email, setEmail } = useContext(GlobalContext);
    const fetchLandmark = async () => {
        try {
          const response = await axios.get('http://localhost:8080/favourite/all',{
              params:{
              email: Email
          }}   );
          setLandmarks(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching landmarks data:', error);
        }
      };
    useEffect(() => {
        
        if (window.location.pathname === '/FAV') {
          fetchLandmark();
        }
      }, []);
      const remove = async (landmark) => {
        try {
           await axios.post('http://localhost:8080/favourite/remove',null,{
                params:{
                id: landmark.fid
            }}   );
            fetchLandmark();
          } catch (error) {
            console.error(landmark);
          }
      };
      
return(
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {Array.isArray(landmarks) &&
          landmarks.map((landmark) => (
            <div className="col" key={landmark.id}>
              <div className="card h-100 fixed-card">
                <img src={landmark.image} className="card-img-top fixed-card-img" alt={landmark.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{landmark.name}</h5>
                  <p className="card-text flex-grow-1">{landmark.description}</p>
                  <p className="card-text flex-grow-1"><strong>Location : {landmark.location}</strong></p>
                  <button className="btn btn-primary btn-learn-more" onClick={() => remove(landmark)}>remove from favorites</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
export default FAV;



