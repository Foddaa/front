import '../LandMark/LandMark.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

function LandMark() {
  const [landmarks, setLandmarks] = useState('');
  const { Email, setEmail } = useContext(GlobalContext);


  useEffect(() => {
    const fetchLandmark = async () => {
      try {
        const response = await axios.get('http://localhost:8080/landmark/all');
        setLandmarks(response.data);
      } catch (error) {
        console.error('Error fetching landmarks data:', error);
      }
    };
    if (window.location.pathname === '/LandMark') {
      fetchLandmark();
    }
  }, []);

  const addFavorite = async (landmark) => {
    try {
       await axios.post('http://localhost:8080/favourite/add',{
        userEmail:Email,
        landMarkId:landmark.id
        }   );
        fetchLandmark();
      } catch (error) {
        console.error(landmark);
      }
  };
  return (
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
                  <button className="btn btn-primary btn-learn-more" onClick={() => addFavorite(landmark)}>add to favourites</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default LandMark;
