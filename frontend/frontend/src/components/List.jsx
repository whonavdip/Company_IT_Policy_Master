import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import back from './back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const [ID,setID]= useState('');
  const [data, setData] = useState(null);
  const [delTask, setDelTask] = useState(false)
  const [refreshCount, setRefreshCount] = useState(0);
  const [filterColumn1, setFilterColumn1] = useState('');
  const [filterValue1, setFilterValue1] = useState('');
  const [filterColumn2, setFilterColumn2] = useState('');
  const [filterValue2, setFilterValue2] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [optionDisabled, setOptionDisabled] = useState("CITPM_PolicyName");
  const options = ["CITPM_PolicyName", "CITPM_SessionTimeOut", "CITPM_FailAttempt", "CITPM_PwdChangeDuration", "CITPM_PwdNotificationDuration"];

  const handleEdit = (CITPM_PolicyID,CITPM_PolicyName,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status) => {
    //console.log(item)
    localStorage.setItem('CITPM_PolicyID',CITPM_PolicyID)
    localStorage.setItem('CITPM_PolicyName',CITPM_PolicyName)
    localStorage.setItem('CITPM_SessionTimeOut',CITPM_SessionTimeOut)
    localStorage.setItem('CITPM_FailAttempt',CITPM_FailAttempt)
    localStorage.setItem('CITPM_PwdNeverExpiry',CITPM_PwdNeverExpiry)
    localStorage.setItem('CITPM_PwdChangeDuration',CITPM_PwdChangeDuration)
    localStorage.setItem('CITPM_PwdNotificationDuration',CITPM_PwdNotificationDuration)
    localStorage.setItem('CITPM_Status',CITPM_Status)

  }

  // Filter options based on the selected value in the other filter
  // const filteredOptions1 = options.filter(option => option !== filterColumn2);
  // const filteredOptions2 = options.filter(option => option !== filterColumn1);

  const handleFilterColumn1 = (event) => {
    const selectedColumn = event.target.value;
    setFilterColumn1(selectedColumn);
    // Reset filter value 2 if it is the same as filter column 1
    if (selectedColumn === filterColumn2) {
      setFilterColumn2('');
      setFilterValue2('');
    }
  };

  const handleFilterValue1 = (event) => {
    const value = event.target.value;
    setFilterValue1(value);
  };

  const handleFilterColumn2 = (event) => {
    const selectedColumn = event.target.value;
    setFilterColumn2(selectedColumn);
    // Reset filter value 1 if it is the same as filter column 2
    if (selectedColumn === filterColumn1) {
      setFilterColumn1('');
      setFilterValue1('');
    }
  };

  const handleFilterValue2 = (event) => {
    const value = event.target.value;
    setFilterValue2(value);
  };

  const handleStatusFilter = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
  };

  const handleSuspend = (ID) => {
    // console.log(ID);
    // //const IDD = ID;
    // axios.put(`http://localhost:4000/CITPM/${ID}`)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //   });
    // setRefreshCount(refreshCount + 1);
  //   const confirmed = window.confirm("Are you sure you want to suspend this item?");
  // if (confirmed) {
  //   axios.put(`http://localhost:4000/CITPM/${ID}`)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   setRefreshCount(refreshCount + 1);
  // }
  console.log(ID)
  axios.put(`http://localhost:4000/CITPM/${ID}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    setRefreshCount(refreshCount + 1);
     
    toast.success('Suspended', {
      autoClose: 500, // Close after 1 second
      onClose: () => {
        // Navigate to other component here
        window.location.reload();
        // For demonstration, I'm just logging a message
        console.log("Navigating to other component...");
      }
    });
    setRefreshCount(refreshCount + 1);
  };


  const handleConfirmationBox = (ID) => {
    setID(ID)
    if (!delTask) {
      document.querySelector(".confirm-bg").style.display = "flex"
      document.querySelector(".container").style.display = "flex"
      setDelTask(true)
    } else {
      document.querySelector(".confirm-bg").style.display = "none"
      document.querySelector(".container").style.display = "none"
      setDelTask(false)
    }
    
  }

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/CITPM');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [refreshCount]);

  const filteredData = data && data.filter(item => {
    if (!filterColumn1 || !filterValue1) return true;

    return item[filterColumn1] && item[filterColumn1].toString().toLowerCase().includes(filterValue1.toLowerCase());
  }).filter(item => {
    if (!filterColumn2 || !filterValue2) return true;

    return item[filterColumn2] && item[filterColumn2].toString().toLowerCase().includes(filterValue2.toLowerCase());
  }).filter(item => {
    if (statusFilter === 'All') return true;
    return item.CITPM_Status === statusFilter;
  });

  return (
    
    <>
     <>
        <div className="container">
          <div className="confirmation-text">
            Do you really want to Suspend this Policy......?
          </div>
          <div className="button-container">
            <button 
              className="cancel-button" 
              onClick={() => handleConfirmationBox()}>
                Cancel
            </button>
            <button 
              className="confirmation-button"
              onClick={() => handleSuspend(ID)}
              >
                Suspend
              </button>
          </div>
        </div>
        <div 
          className="confirm-bg">
          onClick={() => handleConfirmationBox()}
        </div>
      </>
    <div>
      <ToastContainer></ToastContainer>
      <h1 align="center">LIST PAGE</h1>
      <Link to="/components/PolicyMaster"><button className="button-89">BACK</button></Link><br></br>
      <br></br>

      <label className="filter1">Filter Column1:</label>
      <select id="dropdown1"  value={filterColumn1} onChange={handleFilterColumn1}>
        <option value="">All Columns</option>
        {options.map((option, index) => (
          <option key={index}  value={option} disabled={option === filterColumn2}> 
            {option}
          </option>
        ))}
      </select> 
      <label className="filter1">Filter Column2:</label>
      <select id="dropdown2"  value={filterColumn2} onChange={handleFilterColumn2}>
        <option value="">All Columns</option>
        {options.map((option, index) => (
          <option key={index} value={option} disabled={option === filterColumn1}>
            {option}
          </option>
        ))}
      </select> 
      <br></br>

      
      
      <label className="lbl2filter">Filter Value1:</label>
      <input className="srch2" value={filterValue1} onChange={handleFilterValue1} placeholder="Filter Value"></input>
      <label className="lbl2filter">Filter Value2:</label>
      <input className="srch2" value={filterValue2} onChange={handleFilterValue2} placeholder="Filter Value"></input>
      <select value={statusFilter} onChange={handleStatusFilter}>
        <option value="All">All</option>
        <option value="1">Active</option>
        <option value="2">Inactive</option>
        <option value="3">Suspend</option>
      </select>
      <br></br>
      
      <br></br>
      <br></br>

      {filteredData && (
        <table border="2">
          <thead>
            <tr>
              <th>SR NO.</th>
              <th>PolicyName</th>
              <th>SessionTimeOut</th>
              <th>FailAttempt</th>
              <th>PwdNeverExpiry</th>
              <th>PwdChangeDuration</th>
              <th>PwdNotificationDuration</th>
              <th>Status</th>
              <th>UPDATE</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody align="center">
            {filteredData.map((item, index) => (
              <tr key={item.CITPM_PolicyID}>
                <td>{index + 1}</td>
                <td>{item.CITPM_PolicyName}</td>
                <td>{item.CITPM_SessionTimeOut}</td>
                <td>{item.CITPM_FailAttempt}</td>
                <td>{item.CITPM_PwdNeverExpiry==1 ? "TRUE" : "FALSE"}</td>
                <td>{item.CITPM_PwdChangeDuration || '-'}</td>
                <td>{item.CITPM_PwdNotificationDuration || '-'}</td>
                {/* <td>{item.CITPM_Status}</td> */}
                <td>
        {item.CITPM_Status === '1' ? 'Active' :
         item.CITPM_Status === '2' ? 'Inactive' :
         item.CITPM_Status === '3' ? 'Suspend' : null}
      </td>
                
                <td>
                  {item.CITPM_Status === '1' || item.CITPM_Status === '2' ? (
                    <Link to={`/Edit`}>
                      <button className="btnedit" onClick={() => handleEdit(item.CITPM_PolicyID,item.CITPM_PolicyName,item.CITPM_SessionTimeOut,item.CITPM_FailAttempt,item.CITPM_PwdNeverExpiry,item.CITPM_PwdChangeDuration,item.CITPM_PwdNotificationDuration,item.CITPM_Status) }>Edit</button>
                    </Link>
                  ) : item.CITPM_Status === '3' ? (
                    <>-</>
                  ) : null}
                </td>
                <td align="center">
                  {item.CITPM_Status === '1' || item.CITPM_Status === '2' ? (
                    // <button className="btnsuspend" onClick={() => handleSuspend(item.CITPM_PolicyID)}>Suspend</button>
                    
                    <button className="btnsuspend" onClick={() => handleConfirmationBox(item.CITPM_PolicyID)}>Suspend</button>
                    // <button className="delete-button"onClick={() => {handleConfirmationBox()}>Delete </button>
                  ) : item.CITPM_Status === '3' ? (
                    <>-</>
                  ) : null}
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
         
    </>
  );
};

export default List;
