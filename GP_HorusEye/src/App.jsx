import './App.css';
import BackGround from './Components/BackGround';
import NavBar from './Components/NavBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUP';
import Fav from './Pages/FAV/FAV';
import Booking from './Pages/Booking/Booking';
import HorusEye from './Pages/HorusEye/HorusEye';
import History from './Pages/ViewHistory/HistoryForm';
import VerifyPage from './Pages/VerifyPage/VerifyPage';
import Password from './Pages/Password/Password';
import { GlobalProvider } from './context/GlobalContext';
import ViewHotelDetails from './Pages/Booking/ViewHotelDetails';
import LandMark from './Pages/LandMark/LandMark';


function App() {
  return (
    <GlobalProvider>
      <div>
        <NavBar />
        <Routes>
          <Route path='/' element={<BackGround />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/FAV' element={<Fav />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='/HorusEye' element={<HorusEye />} />
          <Route path='/ViewHistory' element={<History />} />
          <Route path='/VerifyPage' element={<VerifyPage />} />
          <Route path='/Password' element={<Password />} />
          <Route path='/LandMark' element={<LandMark />} />
          <Route path='/viewhoteldetails/:HotelID' element={<ViewHotelDetails></ViewHotelDetails>}></Route>
        </Routes>
      </div>
    </GlobalProvider>
  );
}

export default App;