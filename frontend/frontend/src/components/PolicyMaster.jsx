import React from "react";
import { useState } from "react";
import './style.css'
import axios from 'axios';
import {  useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const PolicyMaster = () =>{
  const navigate = useNavigate();
    const [isGreater,setisGreater] = useState(false);
    const [dupPolicy,setdupPolicy] = useState(false);
    const[pn,setpn] = useState(false);
    const[sto,setsto] = useState (false);
    const[pwa,setpwa] = useState (false);
    const[pwdu,setpwdu] = useState (false);
    const[pwno,setpwno] = useState (false);
    const [FillAll,setFillAll] = useState(false);
    const [Required,setRequired] = useState(false);
    const [AlertMessage1,setAlertMessage1] = useState('');
    const [AlertState1,setAlertState1] = useState(false);
    const [AlertMessage2,setAlertMessage2] = useState('');
    const [AlertState2,setAlertState2] = useState(false);
    const [AlertMessage3,setAlertMessage3] = useState('');
    const [AlertState3,setAlertState3] = useState(false);
    const [AlertMessage4,setAlertMessage4] = useState('');
    const [AlertState4,setAlertState4] = useState(false);
    const [AlertMessage5,setAlertMessage5] = useState('');
    const [AlertState5,setAlertState5] = useState(false);
    const [CITPM_PolicyName,setCITPM_PolicyName] = useState('');
    const [CITPM_Status,setCITPM_Status] = useState('1')
    const [SuccessMessage,setSuccessMessage] = useState(false);
    const [LimitPolicyName,setLimitPolicyName] = useState(false);
    const [isValid,setisValid] = useState(false);
    const [CITPM_FailAttempt,setCITPM_FailAttempt] = useState('');
    const [CITPM_PwdChangeDuration,setCITPM_PwdChangeDuration] = useState('');
    const [CITPM_PwdNotificationDuration,setCITPM_PwdNotificationDuration] = useState('');
    const [CITPM_SessionTimeOut,setCITPM_SessionTimeOut] = useState('');
    const [CITPM_PwdNeverExpiry, setCITPM_PwdNeverExpiry] = useState(0);
    const padZero = (num) => {
        return num < 10 ? '0' + num : num;
      };
    //   const navigate = useNavigate();
      const fetchData = async () => {
        try {
          // Send a GET request to check-session endpoint with credentials
          const response = await axios.get('http://localhost:4000/check-session',{withCredentials:true});
          const data = response.data;
          console.log(data)
          if (data=="OK") {
            
           
          }else{
            console.log("Session SET")// Set username if session exists
            navigate('/');


          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
     
      
      useEffect(() => {
       fetchData()
      }, [fetchData()]
    )
      React.useEffect(() => {
        if (SuccessMessage || FillAll) {
          const timeoutId = setTimeout(() => {
            setSuccessMessage(false);
            setFillAll(false)
          }, 3000); // Hide heading after 3 seconds
      
          // Clean up timeout on component unmount
          return () => clearTimeout(timeoutId);
        }
      }, [SuccessMessage,FillAll]);
    
    const [CITPM_CreatedDateTime, setCITPM_CreatedDateTime] = useState(new Date());
   // const formattedDateTime = CITPM_CreatedDateTime.toLocaleString();

    useEffect(() => {
        const interval = setInterval(() => {
            setCITPM_CreatedDateTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(interval);
      }, []); // Run only once on component mount
      const formattedDateTime = `${CITPM_CreatedDateTime.getFullYear()}-${padZero(CITPM_CreatedDateTime.getMonth() + 1)}-${padZero(CITPM_CreatedDateTime.getDate())} ${padZero(CITPM_CreatedDateTime.getHours())}:${padZero(CITPM_CreatedDateTime.getMinutes())}:${padZero(CITPM_CreatedDateTime.getSeconds())}`;


      const logAction = async (action, isError = false) => {
        console.log(`${isError ? '[ERROR] ' : ''}${action}`);
        try {
          const response = await fetch('http://localhost:4000/api/log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ module: "Policy_Master:", action, userCode: "1", isError }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to log action');
          }
        } catch (error) {
          console.error('Error logging action:', error);
        }
      };

    const SaveClick = async(e) => {

        logAction("Save Click Started")

        if(isValid||isGreater||AlertState1||AlertState2||AlertState3||AlertState4||AlertState5||LimitPolicyName){

        }else{
            if(CITPM_PwdNeverExpiry==1){
                if(CITPM_PolicyName=="" || CITPM_SessionTimeOut == "" || CITPM_FailAttempt == ""){
                    // alert("Please fill all the required fields")
                    if(CITPM_PolicyName=="" ){
                        setpn(true)
                    }
                    if(CITPM_SessionTimeOut == ""){
                        setsto(true)
                    }
                     if (CITPM_FailAttempt == ""){
                        setpwa(true)
                    }
                    console.log(CITPM_PwdChangeDuration)
                    if(CITPM_PwdChangeDuration==""){
                        setpwdu(true)
                    }
                   
                    setRequired(true)
                    toast.warning('Fill all the Required fields...!',{
                        autoClose: 2000 // Set auto close time to 2 seconds (2000 milliseconds)
                      });
                }else{
                    if(CITPM_PolicyName.length<=100 && isValid == false){



                       
                        try {
                            // Assuming CITPM_PolicyName is the policy name you want to check
                            
                            
                            const response = await fetch(`http://localhost:4000/CITPM/PNAME/${encodeURIComponent(CITPM_PolicyName)}`);
                            
                            if (response.ok) {
                              const jsonData = await response.json();
                              console.log(jsonData.length); // Assuming jsonData is an array
                              console.log(jsonData);
                              if(jsonData.length>0){
                                    //found
                                    // setdupPolicy(true)
                                    toast.warning('Policy Name already exist...!',{
                                        autoClose: 2000 // Set auto close time to 2 seconds (2000 milliseconds)
                                      });
                              }else{
                                //not found
                                const CITPM_CreatedBy=1;
                                const FormData = {
                                                            CITPM_PolicyName: CITPM_PolicyName,
                                                            CITPM_SessionTimeOut:CITPM_SessionTimeOut,
                                                            CITPM_FailAttempt:CITPM_FailAttempt,
                                                            CITPM_PwdNeverExpiry:CITPM_PwdNeverExpiry,
                                                            CITPM_PwdChangeDuration:CITPM_PwdChangeDuration,
                                                            CITPM_PwdNotificationDuration:CITPM_PwdNotificationDuration,
                                                            CITPM_Status:CITPM_Status,
                                                            CITPM_CreatedBy:CITPM_CreatedBy,
                                                            CITPM_CreatedDateTime:formattedDateTime
                                                        }
                                                        console.log(FormData)
                                                        e.preventDefault();
                                        try {
                                        const response = await axios.post('http://localhost:4000/CITPM', FormData); // Adjust URL as per your API endpoint
                                        console.log(response)
                                        setCITPM_PolicyName('')
                                        setCITPM_SessionTimeOut('')
                                        setCITPM_FailAttempt('')
                                        setCITPM_PwdNeverExpiry(0)
                                        setCITPM_PwdChangeDuration('')
                                        setCITPM_PwdNotificationDuration('')
                                        setCITPM_Status(1)
                                        // setSuccessMessage(true)
                                        toast.success('Data Inserted Succesfully...!');
                                        logAction("Data Saved Sucsessfully")
                                        } catch (error) {
                                        console.error('Error saving data:', error);
                                        }
                              }
                            } else {
                              console.error('Error fetching data:', response.statusText);
                            }
                          } catch (error) {
                            console.error('Error fetching data:', error);
                          }
                    }else{
                        setLimitPolicyName(true)
                    }
                }
            }else{
                if(CITPM_PolicyName=="" || CITPM_SessionTimeOut == "" || CITPM_FailAttempt == "" || CITPM_PwdChangeDuration=="" || CITPM_PwdNotificationDuration.length<1){
                    console.log(CITPM_PolicyName,"_",CITPM_SessionTimeOut,"_",CITPM_FailAttempt,"_",CITPM_PwdNeverExpiry,"_",CITPM_PwdChangeDuration,"_",CITPM_PwdNotificationDuration)
                                // alert("Please fill all the required fields")
                                if(CITPM_PwdChangeDuration==""){
                                    setpwdu(true)
                                } if(CITPM_PwdNotificationDuration.length<1){
                                    setpwno(true)
                                }
                                if(CITPM_PolicyName=="" ){
                                    setpn(true)
                                }
                                if(CITPM_SessionTimeOut == ""){
                                    setsto(true)
                                }
                                 if (CITPM_FailAttempt == ""){
                                    setpwa(true)
                                }
                                console.log(CITPM_PwdChangeDuration)
                                if(CITPM_PwdChangeDuration==""){
                                    setpwdu(true)
                                }
                                setRequired(true)
                                // setFillAll(true)
                                setRequired(true)
                                toast.warning('Fill all the Required fields...!',{
                                    autoClose: 2000 // Set auto close time to 2 seconds (2000 milliseconds)
                                  });
                }else{
                    if(CITPM_PolicyName.length<=100 && isValid == false){
                       
                        try {
                            // Assuming CITPM_PolicyName is the policy name you want to check
                            
                            
                            const response = await fetch(`http://localhost:4000/CITPM/PNAME/${encodeURIComponent(CITPM_PolicyName)}`);
                            
                            if (response.ok) {
                              const jsonData = await response.json();
                              console.log(jsonData.length); // Assuming jsonData is an array
                              console.log(jsonData);
                              if(jsonData.length>0){
                                    //found
                                    // setdupPolicy(true)
                                    toast.warning('Policy Name already exist...!',{
                                        autoClose: 2000 // Set auto close time to 2 seconds (2000 milliseconds)
                                      });
                              }else{
                                //not found
                                const CITPM_CreatedBy=1;
                                const FormData = {
                                                            CITPM_PolicyName: CITPM_PolicyName,
                                                            CITPM_SessionTimeOut:CITPM_SessionTimeOut,
                                                            CITPM_FailAttempt:CITPM_FailAttempt,
                                                            CITPM_PwdNeverExpiry:CITPM_PwdNeverExpiry,
                                                            CITPM_PwdChangeDuration:CITPM_PwdChangeDuration,
                                                            CITPM_PwdNotificationDuration:CITPM_PwdNotificationDuration,
                                                            CITPM_Status:CITPM_Status,
                                                            CITPM_CreatedBy:CITPM_CreatedBy,
                                                            CITPM_CreatedDateTime:formattedDateTime
                                                        }
                                                        console.log(FormData)
                                                        e.preventDefault();
                                        try {
                                        const response = await axios.post('http://localhost:4000/CITPM', FormData); // Adjust URL as per your API endpoint
                                        console.log(response)
                                        setCITPM_PolicyName('')
                                        setCITPM_SessionTimeOut('')
                                        setCITPM_FailAttempt('')
                                        setCITPM_PwdNeverExpiry(0)
                                        setCITPM_PwdChangeDuration('')
                                        setCITPM_PwdNotificationDuration('')
                                        setCITPM_Status(1)
                                        // setSuccessMessage(true)
                                        logAction("Data saved Succesfully")
                                        toast.success('Data Inserted Succesfully...!');
                                        } catch (error) {
                                        console.error('Error saving data:', error);
                                        }
                              }
                            } else {
                              console.error('Error fetching data:', response.statusText);
                            }
                          } catch (error) {
                            console.error('Error fetching data:', error);
                          }
                    }else{
                        setLimitPolicyName(true)
                    }
                }
            }
        }
        logAction("Save Click Ended")
    }
      const handleChangeCITPM_Status = (e) =>{
        const value = e.target.value;
        console.log(value)
        setCITPM_Status(value)
      }
     const CancelClick = () => {
        setCITPM_PolicyName('')
        setCITPM_FailAttempt('')
        setCITPM_PwdChangeDuration('')
        setCITPM_PwdNeverExpiry(0)
        setCITPM_SessionTimeOut('')
        setCITPM_PwdNotificationDuration('')
        setCITPM_Status('1')
        setRequired(false)
        setisValid(false)
        setAlertMessage1(false)
        setAlertMessage2(false)
        setAlertMessage4(false)
        setAlertMessage3(false)
        setpn(false)
        setsto(false)
        setpwa(false)
        setpwdu(false)
        setpwno(false)
     }

    const handleChangeCITPM_PwdNotificationDuration = (e) => {
        let { value } = e.target;
        // Regular expression to match only digits
        const numericRegex = /^[0-9]*$/;
        
        if (numericRegex.test(value)) {
            setCITPM_PwdNotificationDuration(value);
        } else {
            // If the input contains any non-numeric characters, remove them from the value
            value = value.replace(/\D/g, '');
            setCITPM_PwdNotificationDuration(value);
        }
    
        // Check if the value is empty
        if (value === "") {
            setpwno(true);
        } else {
            setpwno(false);
        }
        if(value==""){
            setAlertState4(false)
        }else
        if(value<0||value>999){
            setAlertMessage4("Password Notification Duration Should be 1 to 999")
            setAlertState4(true)
        }else{
            setAlertState4(false)
        }
        if(CITPM_PwdChangeDuration!=""){
            if(value>=CITPM_PwdChangeDuration){
                setisGreater(true)
            }else{
                setisGreater(false)
            }
        }
       
    }
    const handleCITPM_PwdChangeDuration = (e) => {
        let { value } = e.target;
        // Regular expression to match only digits
        const numericRegex = /^[0-9]*$/;
        
        if (numericRegex.test(value)) {
            setCITPM_PwdChangeDuration(value);
        } else {
            // If the input contains any non-numeric characters, remove them from the value
            value = value.replace(/\D/g, '');
            setCITPM_PwdChangeDuration(value);
        }
    
        // Check if the value is empty
        if (value === "") {
            setpwdu(true);
        } else {
            setpwdu(false);
        }
        if(value==""){
            setAlertState2(false)
        }else
        if(value==0||value>999){
            setAlertMessage2("Password Change Duration Should be 0 to 999")
            setAlertState2(true)
        }else{
            setAlertState2(false)
        }
        if(value==""){
            setisGreater(false)
        }else{
            if(value>=CITPM_PwdNotificationDuration){
                setisGreater(false)
            }else{
                setisGreater(true)
            }
        }
    }
    const handleChangePasswordattmept = (e) => {
        let { value } = e.target;
        // Regular expression to match only digits
        const numericRegex = /^[0-9]*$/;
        
        if (numericRegex.test(value)) {
            setCITPM_FailAttempt(value);
        } else {
            // If the input contains any non-numeric characters, remove them from the value
            value = value.replace(/\D/g, '');
            setCITPM_FailAttempt(value);
        }
    
        // Check if the value is empty
        if (value === "") {
            setpwa(true);
        } else {
            setpwa(false);
        }
        if(value==""){
            setAlertState3(false)
        }else
        if(value==0||value>999){
            setAlertMessage3("Password Attempt Should be 0 to 999")
            setAlertState3(true)
        }else{
            setAlertState3(false)
        }
    }

    const handleCITPM_SessionTimeOut = (e) => {
        let { value } = e.target;
        // Regular expression to match only digits
        const numericRegex = /^[0-9]*$/;
        
        if (numericRegex.test(value)) {
            setCITPM_SessionTimeOut(value);
        } else {
            // If the input contains any non-numeric characters, remove them from the value
            value = value.replace(/\D/g, '');
            setCITPM_SessionTimeOut(value);
        }
    
        // Check if the value is empty
        if (value === "") {
            setsto(true);
        } else {
            setsto(false);
        }
        if(value==""){
            setAlertState1(false)
        }else
        if(value==0||value>999){
            setAlertMessage1("Session TimeOut Should be 0 to 999")
            setAlertState1(true)
        }else{
            setAlertState1(false)
        }
    }
    
    const handleCheckboxChange = (event) => {
        
        setCITPM_PwdNeverExpiry(event.target.checked ? 1 : 0);
        setCITPM_PwdChangeDuration('')
        setCITPM_PwdNotificationDuration('')
      };
    
      const handlePolicyNameChange = (e) => {
        const value = e.target.value;
           const regex = /^[a-zA-Z0-9 _]*$/;
            // const regex = /^[a-zA-Z0-9_]+(?: [a-zA-Z0-9_]+)*$/;

            if (regex.test(value)) {
                if ((value.match(/ /g) || []).length <= 1) {
                    // Check if two consecutive underscores are not present
                    if (!value.includes('__')) {
                        const isAlphabetic = /^[A-Za-z].*[A-Za-z]$/.test(value);
                        if(isAlphabetic==false){
                                setisValid(true)
                            

                        }else{
                            setisValid(false)
                        }
                        checkpolicy();
                        setCITPM_PolicyName(value)
                    }
                  }
                
            }
            if(e.target.value==""){
                setpn(true)
            }else{
                setpn(false)
            }
            if(value==""){
                setisValid(false)
            }
      };
      function checkpolicy () {
        if(CITPM_PolicyName.length>=100){
            setLimitPolicyName(true)
        }else{
            setLimitPolicyName(false)
        }
      }

    return(
        <>
        <div align="center">
        <ToastContainer />
        <h1 align="" >
           COMPANY IT POLICY MASTER
        </h1>
        <br></br>
        {SuccessMessage && (<h1>Data Inserted Successfully..!</h1>)}
        {isValid ? <><p className="paragraph11">Policy Name's First and Last character must be alphabet....!</p></> : <></>}
        {isGreater ? <><p className="paragraph11">Notification Duration Should be less than PWD Change Duration</p></> : <></>}

            {AlertState1 ? <><p className="paragraph11">{AlertMessage1}</p></> : <></>}
            {AlertState2 ? <><p className="paragraph11">{AlertMessage2}</p></> : <></>}
            {AlertState3 ? <><p className="paragraph11">{AlertMessage3}</p></> : <></>}
            {AlertState4 ? <><p className="paragraph11">{AlertMessage4}</p></> : <></>}
            {AlertState5 ? <><p className="paragraph11">{AlertMessage5}</p></> : <></>}
            {/* {dupPolicy ? <><p className="paragraph11">Policy Name Already Exist...!</p></> : <></>} */}
            {FillAll ? <><p className="paragraph11">Please Fill All The Required Fields..!</p></>:<></>}
            {LimitPolicyName ? <><p className="paragraph11">Length of Policy Name should be 1 to 100</p></> : <></>}
        <br></br>{/* first rowwwwwwww */}
        {/* <form> */}

            <tr>
                <td><label>Policy Name {pn ? <p className="paragraph">*</p> : <></>}  </label></td>
                <td className="td"><label>Session Time Out(Minutes){sto ? <p className="paragraph2">*</p> : <></>}</label> </td>
            </tr>

            <tr>
                <td>
                <input 
                    type="text" 
                    name="CITPM_PolicyName"
                     value={CITPM_PolicyName} 
                    onChange={handlePolicyNameChange}
                    required
                />
                </td>
                <td className="td">
                    <input type="text" value={CITPM_SessionTimeOut} onChange={handleCITPM_SessionTimeOut} required></input>
                    </td>
            </tr>
 {/* first rowwwwwwww */}


  {/* second rowwwwwwww */}
            <tr>
                <td><label>Password Attempts{pwa ? <p className="paragraph">*</p> : <></>}</label></td>
                <td className="td"><label>Password Never Expire </label></td>
            </tr>
            <tr>
                <td>
                <input
                        type="number"
                        value={CITPM_FailAttempt}
                        onChange={handleChangePasswordattmept}
                        required
                    />
                    {/* <input type="number" ></input> */}
                    </td>
                <td className="td">
                    <input type="checkbox"
                    checked={CITPM_PwdNeverExpiry}
                    onChange={handleCheckboxChange}></input>
                </td>
               
            </tr> 
  {/* second rowwwwwwww */}
             {CITPM_PwdNeverExpiry ? <></> : <><tr>
                    <td><label>Password Change Duration (Days){pwdu ? <p className="paragraph1">*</p> : <></>}</label></td>
                    <td className="td"><label>Password Expire Notification (Days){pwno ? <p className="paragraph4">*</p> : <></>}</label></td>
                </tr>
                <tr>
                    <td>
                        <input type="number"
                        value={CITPM_PwdChangeDuration}
                        onChange={handleCITPM_PwdChangeDuration} required></input>
                    </td>     
                    <td className="td">
                        <input type="number"
                        value={CITPM_PwdNotificationDuration}
                        onChange={handleChangeCITPM_PwdNotificationDuration} ></input>    
                    </td>      
                </tr>
            </>}
            <br></br>
            <tr>
                <td>
                    <label>Status</label><br></br>
                    <select value={CITPM_Status} onChange={handleChangeCITPM_Status}>
                        <option selected value="1">Active</option>
                        <option value="2">Inactive</option>
                    </select>
                </td>
                <td></td>
            </tr>
            <br></br>
            
            {/* {SuccessMessage ? <><h1>Data Inserted Successfully..!</h1></> : <></>} */}
            
            <tr>
                <td><button className="button-52" onClick={SaveClick}>SAVE</button></td>
                <td><button onClick={CancelClick} className="button-52">CANCEL</button></td>
                <td><Link to="/List"><button className="button-52">LIST</button></Link></td>
                {/* <td><Link to="/List1"><button>LIST</button></Link></td> */}


                

            </tr>
            {/* </form> */}
        </div>
        </>
    )
}
export default PolicyMaster;