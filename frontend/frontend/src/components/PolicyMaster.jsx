import React from "react";
import { useState } from "react";
import './style.css'
import axios from 'axios';
import {  useEffect } from 'react';
import { Link } from "react-router-dom";

const PolicyMaster = () =>{
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
    const [CITPM_PwdChangeDuration,setCITPM_PwdChangeDuration] = useState();
    const [CITPM_PwdNotificationDuration,setCITPM_PwdNotificationDuration] = useState('');
    const [CITPM_SessionTimeOut,setCITPM_SessionTimeOut] = useState('');
    const [CITPM_PwdNeverExpiry, setCITPM_PwdNeverExpiry] = useState(0);
    const padZero = (num) => {
        return num < 10 ? '0' + num : num;
      };

      React.useEffect(() => {
        if (SuccessMessage) {
          const timeoutId = setTimeout(() => {
            setSuccessMessage(false);
          }, 3000); // Hide heading after 3 seconds
      
          // Clean up timeout on component unmount
          return () => clearTimeout(timeoutId);
        }
      }, [SuccessMessage]);
    
    const [CITPM_CreatedDateTime, setCITPM_CreatedDateTime] = useState(new Date());
   // const formattedDateTime = CITPM_CreatedDateTime.toLocaleString();

    useEffect(() => {
        const interval = setInterval(() => {
            setCITPM_CreatedDateTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(interval);
      }, []); // Run only once on component mount
      const formattedDateTime = `${CITPM_CreatedDateTime.getFullYear()}-${padZero(CITPM_CreatedDateTime.getMonth() + 1)}-${padZero(CITPM_CreatedDateTime.getDate())} ${padZero(CITPM_CreatedDateTime.getHours())}:${padZero(CITPM_CreatedDateTime.getMinutes())}:${padZero(CITPM_CreatedDateTime.getSeconds())}`;


      const SaveClick = async(e) => {
            if(AlertState1 || AlertState2 || AlertState3 || AlertState4 || AlertState5 || isValid || LimitPolicyName){
            // console.log("if",AlertState)    
            }else{
                if(CITPM_PolicyName=="" || CITPM_SessionTimeOut == "" || CITPM_FailAttempt == ""){
                    alert("Please fill all the required fields")
                }else{
        
                    if(CITPM_PwdNeverExpiry==1){
                        if(CITPM_PolicyName.length<=10 && isValid == false){
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
                                setSuccessMessage(true)
                                } catch (error) {
                                console.error('Error saving data:', error);
                                }
                        }else{
                            setLimitPolicyName(true)
                        }
                        
                    }else{
                        if(CITPM_PwdChangeDuration=="" || CITPM_PwdNotificationDuration.length<1){
                            console.log(CITPM_PolicyName,"_",CITPM_SessionTimeOut,"_",CITPM_FailAttempt,"_",CITPM_PwdNeverExpiry,"_",CITPM_PwdChangeDuration,"_",CITPM_PwdNotificationDuration)
                            alert("Please fill all the required fields 2")
                        }else{
                            if(CITPM_PolicyName.length<=10 && isValid == false){
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
                                    setSuccessMessage(true)
                                    } catch (error) {
                                    console.error('Error saving data:', error);
                                    }
                            }else{
                                setLimitPolicyName(true)
                            }
                        }
                    }
                }
        
            }
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
     }
    

    const handleChangeCITPM_PwdNotificationDuration = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_PwdNotificationDuration(inputValue)
        if(inputValue>=0 && inputValue<=999){
            setAlertState4(false)
        }else{
            setAlertMessage4("Password Notification Duration Should between 1 to 999")
            setAlertState4(true)
        }
        // let inputValue = parseInt(e.target.value, 10);
    
        // // Check if the input value is within the range of 0 to 999
        // if (isNaN(inputValue) || inputValue < 0) {
        //     // If the input is less than 0 or NaN, set it to 0 and show an error message
        //     inputValue = 0;
        //     alert('Password Notification Duration must be a number between 0 and 999');
        // } else if (inputValue > 999) {
        //     // If the input is greater than 999, set it to 999 and show an error message
        //     inputValue = 999;
        //     alert('Password Notification Duration must be a number between 0 and 999');
        // } else {
        //     // If the input is within the range, update the state
        //     setCITPM_PwdNotificationDuration(inputValue)
        // }
    }
    
    const handleCITPM_PwdChangeDuration = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_PwdChangeDuration(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState3(false)
        }else{
            setAlertMessage3("Password Change Duration Should between 1 to 999")
            setAlertState3(true)
        }
        // let inputValue = parseInt(e.target.value, 10);

        // // Check if the input value is within the range of 1 to 999
        // if (inputValue < 1 || isNaN(inputValue)) {
        //     // If the input is less than 1 or NaN, set it to 1 and show an error message
        //     inputValue = 1;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Password Change Duration Should be 1 to 999....!')
        //     setAlertState(true)
        // } else if (inputValue > 999) {
        //     // If the input is greater than 999, set it to 999 and show an error message
        //     inputValue = 999;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Password Change Duration Should be 1 to 999....!')
        //     setAlertState(true)
        // } else {
        //     // If the input is within the range, update the state
        //     setCITPM_PwdChangeDuration(inputValue);
        //     setAlertState(false)
        // }
    }
    const handleChangePasswordattmept = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_FailAttempt(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState2(false)
        }else{
            setAlertMessage2("Password Attempt Should between 1 to 999")
            setAlertState2(true)
        }
        // let inputValue = parseInt(e.target.value, 10);

        // // Check if the input value is within the range of 1 to 999
        // if (inputValue < 1 || isNaN(inputValue)) {
        //     // If the input is less than 1 or NaN, set it to 1 and show an error message
        //     inputValue = 1;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Password Attempt Should be 1 to 999....!')
        //     setAlertState(true)
        // } else if (inputValue > 999) {
        //     // If the input is greater than 999, set it to 999 and show an error message
        //     inputValue = 999;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Password Attempt Should be 1 to 999....!')
        //     setAlertState(true)
        // } else {
        //     // If the input is within the range, update the state
        //     setCITPM_FailAttempt(inputValue);
        //     setAlertState(false)
        // }
    }

    const handleCITPM_SessionTimeOut = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_SessionTimeOut(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState1(false)
        }else{
            setAlertMessage1("Session TimeOut Should between 1 to 999")
            setAlertState1(true)
        }
        // Check if the input value is within the range of 1 to 999
        // if (inputValue < 1 || isNaN(inputValue)) {
        //     // If the input is less than 1 or NaN, set it to 1 and show an error message
        //     inputValue = 1;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Session TimeOut Should be 1 to 999....!')
        //     setAlertState(true)
        // } else if (inputValue > 999) {
        //     // If the input is greater than 999, set it to 999 and show an error message
        //     inputValue = 999;
        //     // setCITPM_SessionTimeOut(inputValue);
        //     setAlertMessage('Session TimeOut Should be 1 to 999....!')
        //     setAlertState(true)
        // } else {
        //     // If the input is within the range, update the state
        //     setCITPM_SessionTimeOut(inputValue);
        //     setAlertState(false)
        // }
    }

    const handleCheckboxChange = (event) => {
        
        setCITPM_PwdNeverExpiry(event.target.checked ? 1 : 0);
        setCITPM_PwdChangeDuration()
        setCITPM_PwdNotificationDuration()
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

      };
      function checkpolicy () {
        if(CITPM_PolicyName.length>=10){
            setLimitPolicyName(true)
        }else{
            setLimitPolicyName(false)
        }
      }

    return(
        <>
        <div align="center">
        <h1 align="" >
           COMPANY IT POLICY MASTER
        </h1>
        <br></br>
        {SuccessMessage && (<h1>Data Inserted Successfully..!</h1>)}
        {isValid ? <><p className="paragraph">Policy Name's First and Last character must be alphabet....!</p></> : <></>}
            {AlertState1 ? <><p className="paragraph">{AlertMessage1}</p></> : <></>}
            {AlertState2 ? <><p className="paragraph">{AlertMessage2}</p></> : <></>}
            {AlertState3 ? <><p className="paragraph">{AlertMessage3}</p></> : <></>}
            {AlertState4 ? <><p className="paragraph">{AlertMessage4}</p></> : <></>}
            {AlertState5 ? <><p className="paragraph">{AlertMessage5}</p></> : <></>}
            {LimitPolicyName ? <><p className="paragraph">Length of Policy Name should be 1 to 100</p></> : <></>}
        <br></br>{/* first rowwwwwwww */}
        {/* <form> */}

            <tr>
                <td><label>Policy Name</label></td>
                <td className="td"><label>Session Time Out(Minutes)</label></td>
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
                    <input type="number" value={CITPM_SessionTimeOut} onChange={handleCITPM_SessionTimeOut} required></input>
                </td>
            </tr>
 {/* first rowwwwwwww */}


  {/* second rowwwwwwww */}
            <tr>
                <td><label>Password Attempts</label></td>
                <td className="td"><label>Password Never Expire</label></td>
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
                    <td><label>Password Change Duration (Days)</label></td>
                    <td className="td"><label>Password Expire Notification (Days)</label></td>
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