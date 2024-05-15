import axios from 'axios';
import { useDeferredValue, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const YourComponent = () => {
  const navigate = useNavigate();

  const sessionHandle = async () => {
    try {
      // Send a POST request to login endpoint with credentials
      const response = await axios.post('http://localhost:4000/login', { username: 'NAVDEEP' },{withCredentials:true});
      if (response.data === "NAVDEEP") { 
        console.log("API SUCCESS");
        fetchData(); // Check session status after successful login
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
    fetchData()
  };

  const fetchData = async () => {
    try {
      // Send a GET request to check-session endpoint with credentials
      const response = await axios.get('http://localhost:4000/check-session',{withCredentials:true});
      const data = response.data;
      console.log(data)
      if (data=="OK") {
        
        console.log("Session SET")// Set username if session exists
        navigate('/components/PolicyMaster');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  
  useEffect(() => {
   fetchData()
  }, [fetchData()]
)

  return (
    <>
      <button onClick={sessionHandle}>CLICK HERE FOR DASHBOARD</button>
      <h1></h1>
    </>
  );
};

export default YourComponent;
