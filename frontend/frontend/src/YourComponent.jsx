
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { useHistory } from 'react-router-dom';
import { useNavigation } from "react-router-dom";


const Home = () => {





    
    axios.defaults.withCredentials = true;

    const [name,setname] = useState('');
    // const history = useHistory();
    const navigate = useNavigate();
    const sessionHandle = async (e) => {
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'user1' })
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            if (data === "success") {
                // Navigate to other page
                console.log("navigating")
                // history.push('/components/PolicyMaster'); 
                navigate('/components/PolicyMaster');
            } else {
                // Do not navigate
                console.log("Login failed");
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    // useEffect(()=>{
    // axios.get('http://localhost:4000/')
    // .then( res => {
    //    if(res.data.valid){
    //     navigate('/components/PolicyMaster')
    //    }else{
        
    //    }
    // })
    // .catch(err => console.log(err))
    // },[])
    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:4000/login/check', {
          method: 'GET',
          credentials: 'include' // Include cookies if using sessions
        })
          .then(response => response.json())
          .then(data => {
            // Check if the response is valid
            if (data.valid) {
              // Redirect to another component
              console.log(data)
                setname(data.username)
            navigate('/components/PolicyMaster')
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            console.log(error)
          });
      }, []);

      
    return(
        <>
        
            <h1>
                COMPANY IT POLICY MASTER
            </h1>
            {/* <Link to="/components/PolicyMaster"> */}
                <button onClick={sessionHandle}>CLICK HERE FOR DASHBOARD</button>
                {/* </Link> */}
            
       
        </>
    )
}

export default Home;
