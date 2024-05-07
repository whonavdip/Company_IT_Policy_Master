import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

const Edit = () => {
    const [AlertMessage1,setAlertMessage1] = useState('');
    const [AlertState1,setAlertState1] = useState(false);
    const [AlertMessage2,setAlertMessage2] = useState('');
    const [AlertState2,setAlertState2] = useState(false);
    const [AlertMessage3,setAlertMessage3] = useState('');
    const [AlertState3,setAlertState3] = useState(false);
    const [AlertMessage4,setAlertMessage4] = useState('');
    const [AlertState4,setAlertState4] = useState(false);
    const [CITPM_PolicyID, setCITPM_PolicyID] = useState('');
    const [SuccessMessage,setSuccessMessage] = useState(false);
    const [CITPM_PolicyName, setCITPM_PolicyName] = useState('');
    const [CITPM_SessionTimeOut, setCITPM_SessionTimeOut] = useState('');
   
    const [CITPM_FailAttempt, setCITPM_FailAttempt] = useState('');
    const [CITPM_PwdNeverExpiry, setCITPM_PwdNeverExpiry] = useState(0); // Initialize with 0
    const [CITPM_PwdChangeDuration, setCITPM_PwdChangeDuration] = useState();
    const [CITPM_PwdNotificationDuration, setCITPM_PwdNotificationDuration] = useState();
    const [CITPM_Status, setCITPM_Status] = useState('');
    React.useEffect(() => {
        if (SuccessMessage) {
          const timeoutId = setTimeout(() => {
            setSuccessMessage(false);
           navigate('/List'); 
            
          }, 1000); // Hide heading after 3 seconds
      
          // Clean up timeout on component unmount
          return () => clearTimeout(timeoutId);
        }
      }, [SuccessMessage]);
    const padZero = (num) => {
        return num < 10 ? '0' + num : num;
      };

      const [CITPM_CreatedDateTime, setCITPM_CreatedDateTime] = useState(new Date());
   // const formattedDateTime = CITPM_CreatedDateTime.toLocaleString();

    useEffect(() => {
        const interval = setInterval(() => {
            setCITPM_CreatedDateTime(new Date());
        }, 1000); // Update every second
    
        return () => clearInterval(interval);
      }, []); // Run only once on component mount
      const formattedDateTime = `${CITPM_CreatedDateTime.getFullYear()}-${padZero(CITPM_CreatedDateTime.getMonth() + 1)}-${padZero(CITPM_CreatedDateTime.getDate())} ${padZero(CITPM_CreatedDateTime.getHours())}:${padZero(CITPM_CreatedDateTime.getMinutes())}:${padZero(CITPM_CreatedDateTime.getSeconds())}`;

    
    const navigate = useNavigate();

    const UpdateClick = async(e) => {
        if(AlertState1 || AlertState2 || AlertState3 || AlertState4){
            // console.log("if",AlertState)    
        }else{
            if(CITPM_PolicyName=="" || CITPM_SessionTimeOut == "" || CITPM_FailAttempt == ""){
                alert("Please fill all the required fields")
            }else{
    
                if(CITPM_PwdNeverExpiry==1){
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
                            const response = await axios.put(`http://localhost:4000/CITPM/edit/${CITPM_PolicyID}`, FormData); // Adjust URL as per your API endpoint
                            console.log(response)
                            setCITPM_PolicyName('')
                            setCITPM_SessionTimeOut('')
                            setCITPM_FailAttempt('')
                            setCITPM_PwdNeverExpiry(0)
                            setCITPM_PwdChangeDuration('')
                            setCITPM_PwdNotificationDuration('')
                            setSuccessMessage(true)
                            // alert("Data Updated Successfully");
                           // navigate('/List'); 
                           setSuccessMessage(true)
                            } catch (error) {
                            console.error('Error saving data:', error);
                            }
                }else{
                    if(CITPM_PwdChangeDuration==""){
                        alert("Please fill all the required fields")
                    }else{
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
                            const response = await axios.put(`http://localhost:4000/CITPM/edit/${CITPM_PolicyID}`, FormData); // Adjust URL as per your API endpoint
                            console.log(response)
                            setCITPM_PolicyName('')
                            setCITPM_SessionTimeOut('')
                            setCITPM_FailAttempt('')
                            setCITPM_PwdNeverExpiry(0)
                            setCITPM_PwdChangeDuration('')
                            setCITPM_PwdNotificationDuration('')
                            // alert("Data Updated Successfully");
                            // navigate('/List'); 
                           setSuccessMessage(true)
    
                            } catch (error) {
                            console.error('Error saving data:', error);
                            }
                    }
                }
            }
        }
        
      }
    const handleCITPM_SessionTimeOutChange = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_SessionTimeOut(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState1(false)
        }else{
            setAlertMessage1("Session TimeOut Should between 1 to 999")
            setAlertState1(true)
        }
    }
    const handleCITPM_PwdChangeDuration =  (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_PwdChangeDuration(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState3(false)
        }else{
            setAlertMessage3("Password Change Duration Should between 1 to 999")
            setAlertState3(true)
        }
    }

    const handleCITPM_PwdNotificationDuration =  (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_PwdNotificationDuration(inputValue)
        if(inputValue>=0 && inputValue<=999){
            setAlertState2(false)
        }else{
            setAlertMessage2("Password Notification Duration Should between 1 to 999")
            setAlertState2(true)
        }
    }


    const handleCITPM_FailAttempt = (e) => {
        let inputValue = parseInt(e.target.value, 10);
        setCITPM_FailAttempt(inputValue)
        if(inputValue>0 && inputValue<=999){
            setAlertState2(false)
        }else{
            setAlertMessage2("Password Fail Attmept Should between 1 to 999")
            setAlertState2(true)
        }
    }
    useEffect(() => {
        // Fetch data from localStorage or API and set the state
        setCITPM_PolicyID(localStorage.getItem('CITPM_PolicyID'))
        setCITPM_PolicyName(localStorage.getItem('CITPM_PolicyName'))
        setCITPM_SessionTimeOut(localStorage.getItem('CITPM_SessionTimeOut'))
        setCITPM_FailAttempt(localStorage.getItem('CITPM_FailAttempt'))
        setCITPM_PwdNeverExpiry(parseInt(localStorage.getItem('CITPM_PwdNeverExpiry'), 10)) // Parse as integer
        setCITPM_PwdChangeDuration(localStorage.getItem('CITPM_PwdChangeDuration'))
        setCITPM_PwdNotificationDuration(localStorage.getItem('CITPM_PwdNotificationDuration'))
        setCITPM_Status(localStorage.getItem('CITPM_Status'))
    },[])

    const handleCheckboxChange = (event) => {
        console.log("checked")
        setCITPM_PwdNeverExpiry(event.target.checked ? 1 : 0);
        let chbx = event.target.checked
        if(chbx==false){
            setCITPM_PwdChangeDuration(localStorage.getItem('CITPM_PwdChangeDuration'))
            setCITPM_PwdNotificationDuration(localStorage.getItem('CITPM_PwdNotificationDuration'))
        }else{
            setCITPM_PwdChangeDuration()
            setCITPM_PwdNotificationDuration()
        }
        
    };

    const handleStatusChange = (e) => {
        setCITPM_Status(e.target.value);
    };

    const cancelClick = () => {
        setCITPM_SessionTimeOut('')
        setCITPM_FailAttempt('')
        setCITPM_PwdNeverExpiry(0)
        setCITPM_PwdChangeDuration('')
        setCITPM_PwdNotificationDuration('')
    }

    return(
        <>
        <div align="center">
            <h1>EDIT PAGE</h1><br></br><br></br>
            {SuccessMessage && (<h1>Data Inserted Successfully..!</h1>)}
            {AlertState1 ? <><p className="paragraph">{AlertMessage1}</p></> : <></>}
            {AlertState2 ? <><p className="paragraph">{AlertMessage2}</p></> : <></>}

            {AlertState3 ? <><p className="paragraph">{AlertMessage3}</p></> : <></>}

            {AlertState4 ? <><p className="paragraph">{AlertMessage4}</p></> : <></>}

            {/* {LimitPolicyName ? <><p className="paragraph">Length of Policy Name should be 1 to 100</p></> : <></>} */}
            <br></br>
            <tr>
                <td><label>Policy Name</label></td>
                <td>:</td>
                <td><input value={CITPM_PolicyName} readOnly ></input></td>
            </tr>
            
            <tr>
                <br></br>
            </tr>
            <tr>
                <td><label>Session TimeOut</label></td>
                <td>:</td>
                <td><input value={CITPM_SessionTimeOut} onChange={handleCITPM_SessionTimeOutChange} required></input></td>
            </tr>
            <tr>
                <br></br>
            </tr>
            <tr>
                <td><label>Password Attmepts</label></td>
                <td>:</td>
                <td><input value={CITPM_FailAttempt} onChange={handleCITPM_FailAttempt} required></input></td>
            </tr>
            <tr>
                <br></br>
            </tr>
            <tr>
                <td><label>Password Never Expire</label></td>
                <td>:</td>
                <td align="center"><input type="checkbox" checked={CITPM_PwdNeverExpiry === 1}  required onChange={handleCheckboxChange}></input></td>
            </tr>
            <tr>
                <br></br>
            </tr>
            {CITPM_PwdNeverExpiry !== 1 && ( // Check against integer 1
                <>
                    <tr>
                        <td><label>Password Change Duration (Days)</label></td>
                <td>:</td>
                        <td><input type="number" value={CITPM_PwdChangeDuration} required onChange={handleCITPM_PwdChangeDuration}></input></td>
                    </tr>
                    <tr>
                <br></br>
            </tr>
                    <tr>
                        <td><label>Password Expire Notification (Days)</label></td>
                <td>:</td>
                        <td><input type="number" value={CITPM_PwdNotificationDuration} required onChange={handleCITPM_PwdNotificationDuration} ></input></td>
                    </tr>
                    <tr>
                <br></br>
            </tr>
                </>
            )}
            <tr>
                <td><label>Status</label></td>
                <td>:</td>
                <td>
                    <select value={CITPM_Status} onChange={handleStatusChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </td>
            </tr>
            <tr>
                <br></br>
            </tr>
            <tr>
                <td align="center" colSpan="2" ><button  onClick={UpdateClick} className="button-52">UPDATE</button>    </td>
                <td><button className="button-52" onClick={cancelClick}>CANCEL</button></td>
                <td><Link to="/List"><button className="button-52">LIST</button></Link></td>
            </tr>
            <tr>
                <br></br>
            </tr>
            </div>
        </>
    )
}

export default Edit;
