import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
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
    const [CITPM_PolicyID, setCITPM_PolicyID] = useState('');
    const [SuccessMessage,setSuccessMessage] = useState(false);
    const [CITPM_PolicyName, setCITPM_PolicyName] = useState('');
    const [CITPM_SessionTimeOut, setCITPM_SessionTimeOut] = useState('');
    const [isGreater,setisGreater] = useState(false);
   
    const [CITPM_FailAttempt, setCITPM_FailAttempt] = useState('');
    const [CITPM_PwdNeverExpiry, setCITPM_PwdNeverExpiry] = useState(0); // Initialize with 0
    const [CITPM_PwdChangeDuration, setCITPM_PwdChangeDuration] = useState('');
    const [CITPM_PwdNotificationDuration, setCITPM_PwdNotificationDuration] = useState('');
    const [CITPM_Status, setCITPM_Status] = useState('');
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
        if(CITPM_PwdNotificationDuration=='null'){
            setCITPM_PwdNotificationDuration();
        }
        if(CITPM_PwdChangeDuration=='null'){
            setCITPM_PwdChangeDuration();
        }
        
   
    },[])
    // console.log(CITPM_PolicyID)
    // console.log(CITPM_PolicyName)
    // console.log(CITPM_SessionTimeOut)
    // console.log(CITPM_FailAttempt)
    // console.log(CITPM_PwdNeverExpiry)
    // console.log(CITPM_PwdChangeDuration)
    // console.log(CITPM_PwdNotificationDuration)
    // console.log(CITPM_Status)
    React.useEffect(() => {
        if (SuccessMessage) {
          const timeoutId = setTimeout(() => {
            setSuccessMessage(false);
           navigate('/List'); 
            
          }, 1000); // Hide heading after 3 seconds
      
          // Clean up timeout on component unmount
          return () => clearTimeout(timeoutId);
        }
        if (FillAll) {
            const timeoutId = setTimeout(() => {
              setFillAll(false);
            //  navigate('/List'); 
              
            }, 1000); // Hide heading after 3 seconds
        
            // Clean up timeout on component unmount
            return () => clearTimeout(timeoutId);
          }
      }, [SuccessMessage,FillAll]);
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
        if(isGreater||AlertState1||AlertState2||AlertState3||AlertState4){
            // console.log("if",AlertState)    
        }else{
            if(CITPM_PolicyName=="" || CITPM_SessionTimeOut == "" || CITPM_FailAttempt == ""){
                // alert("Please fill all the required fields")
                // if(CITPM_PolicyName=="" ){
                //     setpn(true)
                // }
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
                 if(CITPM_PwdNotificationDuration.length<1){
                    setpwno(true)
                }
                setFillAll(true)
                setRequired(true)
                
            }else{
    
                if(CITPM_PwdNeverExpiry==1){
                    const CITPM_CreatedBy=1;
                    setCITPM_PwdNotificationDuration(undefined)
                    setCITPM_PwdChangeDuration(undefined)
                    const FormData = {
                                                CITPM_PolicyName: CITPM_PolicyName,
                                                CITPM_SessionTimeOut:CITPM_SessionTimeOut,
                                                CITPM_FailAttempt:CITPM_FailAttempt,
                                                CITPM_PwdNeverExpiry:CITPM_PwdNeverExpiry,
                                                CITPM_PwdChangeDuration:null,
                                                CITPM_PwdNotificationDuration:null,
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
                            // setSuccessMessage(true)
                            toast.success('Update Success', {
                                autoClose: 500, // Close after 1 second
                                onClose: () => {
                                  // Navigate to other component here
                                  navigate('/List')
                                  // For demonstration, I'm just logging a message
                                  console.log("Navigating to other component...");
                                }
                              });

                            // alert("Data Updated Successfully");
                        //    navigate('/List'); 
                        //    setSuccessMessage(true)
                            } catch (error) {
                            console.error('Error saving data:', error);
                            }
                }else{
                    if(CITPM_PwdChangeDuration=='null' || CITPM_PwdNotificationDuration=='null' || CITPM_PwdNotificationDuration.length<1){
                        // alert("Please fill all the required fields")
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
                         if(CITPM_PwdNotificationDuration.length<1){
                            setpwno(true)
                        }
                        setFillAll(true)
                        setRequired(true)
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
                        //    setSuccessMessage(true)
                        toast.success('Update Success', {
                            autoClose: 500, // Close after 1 second
                            onClose: () => {
                              // Navigate to other component here
                              navigate('/List')
                              // For demonstration, I'm just logging a message
                              console.log("Navigating to other component...");
                            }
                          });
    
                            } catch (error) {
                            console.error('Error saving data:', error);
                            }
                    }
                }
            }
        }
        
      }
    const handleCITPM_SessionTimeOutChange = (e) => {
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
    const handleCITPM_PwdChangeDuration =  (e) => {
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

    const handleCITPM_PwdNotificationDuration =  (e) => {
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


    const handleCITPM_FailAttempt = (e) => {
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
    
    // console.log(CITPM_PolicyID)
    // console.log(CITPM_PolicyID)

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
        setsto(false)
        setpwa(false)
        setpwdu(false)
        setpwno(false)
        setisGreater(false)
    }

    return(
        <>
        <div align="center">
            <ToastContainer></ToastContainer>
            <h1>EDIT PAGE</h1><br></br><br></br>
            {SuccessMessage && (<h1>Data Inserted Successfully..!</h1>)}
            {AlertState1 ? <><p className="paragraph11">{AlertMessage1}</p></> : <></>}
            {AlertState2 ? <><p className="paragraph11">{AlertMessage2}</p></> : <></>}
            {FillAll ? <><p className="paragraph11">Please Fill All The Required Fields..!</p></>:<></>}
            {isGreater ? <><p className="paragraph11">Notification Duration Should be less than PWD Change Duration</p></> : <></>}

            {AlertState3 ? <><p className="paragraph11">{AlertMessage3}</p></> : <></>}

            {AlertState4 ? <><p className="paragraph11">{AlertMessage4}</p></> : <></>}

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
                <td><label>Session TimeOut {sto ? <p className="paragrapheditsession">*</p> : <></>}</label></td>
                <td>:</td>
                <td><input type="number" value={CITPM_SessionTimeOut} onChange={handleCITPM_SessionTimeOutChange} required></input></td>
            </tr>
            <tr>
                <br></br>
            </tr>
            <tr>
                <td><label>Password Attmepts{pwa ? <p className="paragrapheditpwat">*</p> : <></>}</label></td>
                <td>:</td>
                <td><input type="number"value={CITPM_FailAttempt} onChange={handleCITPM_FailAttempt} required></input></td>
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
                        <td><label>Password Change Duration (Days){pwdu ? <p className="paragrapheditpwdcd">*</p> : <></>}</label></td>
                <td>:</td>
                        <td><input type="number" value={CITPM_PwdChangeDuration} required onChange={handleCITPM_PwdChangeDuration}></input></td>
                    </tr>
                    <tr>
                <br></br>
            </tr>
                    <tr>
                        <td><label>Password Expire Notification (Days){pwno ? <p className="paragrapheditpwden">*</p> : <></>}</label></td>
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
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
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
