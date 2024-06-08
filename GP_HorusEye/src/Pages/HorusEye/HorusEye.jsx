import axios from 'axios'
import './HorusEye.css'
import { useRef, useState } from 'react'

///////////////////////////////////////////////////////


function HorusEye() {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
              videoRef.current.srcObject = stream;
          }
      } catch (error) {
          console.error('Error accessing camera:', error);
      }
  };

  const captureFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
          console.error('Video or canvas ref not found');
          return;
      }

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL('image/jpeg');
      const imageBlob = dataURLToBlob(imageDataURL);

      sendToModel(imageBlob);
  };

  const dataURLToBlob = (dataURL) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
  };

  const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
      if (!selectedFile) {
          alert('Please select a file.');
          return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
          const response = await axios.post('http://localhost:8080/api/predict', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          setMessage(response.data.message); // Extract message from response
      } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Error processing the image.');
      }
  };

  const sendToModel = async (imageBlob) => {
      const formData = new FormData();
      formData.append('file', imageBlob, 'captured-frame.jpg');

      try {
          const response = await axios.post('http://localhost:8080/api/predict', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          setMessage(response.data.message); // Extract message from response
      } catch (error) {
          console.error('Error sending data to model:', error);
          setMessage('Error processing the image.');
      }
  };
  return (
    <div className="BackGround">
      <div className='Header'>
        <h1 className='H'>Welcome to our new technology</h1>
        <div className='HE'>
          <img src='/public/Group 4.png' className='img' />
          <h1>Horus EYE</h1>
          <img src='/public/Group 4.png' className='img' />
        </div>
      </div>

      <div className="HorusEye">
        <div >
          <video ref={videoRef} className="video" ></video>
          <button onClick={captureFrame}>Capture</button>
        </div>
        <div>
          <input type="file" id='fileInput' onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
          <label for='fileInput' className='LabelFile'>Enter Landmark</label>
          <button onClick={handleFileUpload}>Process</button>
        </div>
      </div>
      {
        <div >
          <canvas ref={canvasRef} className="photo"></canvas>
        </div>
      }
      <div className='buttom'>
        <h3>Your description</h3>
        <h4>{message}</h4>
      </div>
    </div>
    /** 
        <div className="HorusEye">
                <div >
                <video ref={videoRef} className="video" ></video>
                <button onClick={takePhoto}>Capture</button>
                </div>
                <div>
                <input type="file" id='fileInput' accept="image/*"style={{display:'none'}}/>
                <label for='fileInput' className='LabelFile'>Enter Landmark</label>
                <button onClick={takePhoto}>Process</button>
                </div>
            </div>
            <h1>Descrption</h1>
            {/* //// dih ya fady 3ashn lma tados capture el sora eli sawrtaha tzhr 
            <div className={'result' + hasphoto ? 'hasphoto' :''}>
                <canvas ref={photoRef} className="photo"></canvas>
            </div>*/
            // </div>
    //  * */ 
    
    
  )
}
export default HorusEye;