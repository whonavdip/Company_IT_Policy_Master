
const express = require('express');
const mysql = require('mysql');
const connection = require('./dbconn')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const port = 4000;
var cors = require('cors')
app.use(express.json());
app.use(cors());

app.post('/CITPM', (req, res) => {
    const {CITPM_PolicyName,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime} = req.body;
    // console.log("RECIEVED DATA :",req.body)
        
  console.log("Received Data:", req.body); // Log the received data
  
  const query = `INSERT INTO company_it_policy.companyitpolicymaster(CITPM_PolicyName,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime)VALUES(?,?,?,?,?,?,?,?,?);`;
  
  connection.query(query, [CITPM_PolicyName,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } else {
      console.log("Inserted successfully:", result);
      res.send("SUCCESS");
    }
  });
//res.send("succ")
});


app.get('/CITPM', (req, res) => {
  let sql = "SELECT companyitpolicymaster.CITPM_PolicyID,companyitpolicymaster.CITPM_PolicyName,companyitpolicymaster.CITPM_SessionTimeOut,companyitpolicymaster.CITPM_FailAttempt,companyitpolicymaster.CITPM_PwdNeverExpiry,companyitpolicymaster.CITPM_PwdChangeDuration,companyitpolicymaster.CITPM_PwdNotificationDuration,companyitpolicymaster.CITPM_Status FROM company_it_policy.companyitpolicymaster ORDER BY CITPM_CreatedDateTime DESC;";
  connection.query(sql,function(err,results){
    if(err) throw err;
    res.send(results);
  })
});

app.put('/CITPM/:id',(req,res) =>{
  const { id } = req.params; // Get the ID from the request URL
  //const { value } = req.body; 
  console.log(id)
  let sql = "UPDATE company_it_policy.companyitpolicymaster SET CITPM_Status = 3 WHERE CITPM_PolicyID = ?;";
  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Error updating data in SQL table:', err);
      res.status(500).json({ error: 'Failed to update data' });
      return;
    }
    console.log('Data updated in SQL table:', result);
    res.status(200).json({ message: 'Data updated successfully' });
  });
  //res.send("sss")
})


// app.put('/CITPM/edit/:id',(req,res) =>{
//   const { id } = req.params; // Get the ID from the request URL
//   const {CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime} = req.body;
//   console.log(CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime)
//   let sql = "UPDATE company_it_policy.companyitpolicymaster SET CITPM_SessionTimeOut = ?,CITPM_FailAttempt = ?,CITPM_PwdNeverExpiry = ?,CITPM_PwdChangeDuration = ?,CITPM_PwdNotificationDuration = ?,CITPM_Status = ?,CITPM_ModifiedBy = ,CITPM_ModifiedDateTime = ? WHERE CITPM_PolicyID = ?;";
//   connection.query(sql,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime,id, (err, result) => {
//     console.log(sql)
//     if (err) {
//       console.error('Error updating data in SQL table:', err);
//       res.status(500).json({ error: 'Failed to update data' });
//       return;
//     }
//     console.log('Data updated in SQL table:', result);
//     res.status(200).json({ message: 'Data updated successfully' });
//   });
//   // res.send("sss")
// })


app.put('/CITPM/edit/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the request URL
  const { CITPM_SessionTimeOut, CITPM_FailAttempt, CITPM_PwdNeverExpiry, CITPM_PwdChangeDuration, CITPM_PwdNotificationDuration, CITPM_Status, CITPM_CreatedBy, CITPM_CreatedDateTime } = req.body;

  console.log(CITPM_SessionTimeOut, CITPM_FailAttempt, CITPM_PwdNeverExpiry, CITPM_PwdChangeDuration, CITPM_PwdNotificationDuration, CITPM_Status, CITPM_CreatedBy, CITPM_CreatedDateTime);

  let sql = "UPDATE company_it_policy.companyitpolicymaster SET CITPM_SessionTimeOut = ?, CITPM_FailAttempt = ?, CITPM_PwdNeverExpiry = ?, CITPM_PwdChangeDuration = ?, CITPM_PwdNotificationDuration = ?, CITPM_Status = ?, CITPM_ModifiedBy = ?, CITPM_ModifiedDateTime = ? WHERE CITPM_PolicyID = ?";

  // Parameters should be passed as an array
  let params = [CITPM_SessionTimeOut, CITPM_FailAttempt, CITPM_PwdNeverExpiry, CITPM_PwdChangeDuration, CITPM_PwdNotificationDuration, CITPM_Status, CITPM_CreatedBy, CITPM_CreatedDateTime, id];

  connection.query(sql, params, (err, result) => {
    console.log(sql, params);
    if (err) {
      console.error('Error updating data in SQL table:', err);
      res.status(500).json({ error: 'Failed to update data' });
      return;
    }
    console.log('Data updated in SQL table:', result);
    res.status(200).json({ message: 'Data updated successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connection.connect(function(err){
    if(err) throw err;
    console.log("DATABASE CONNECTED");
  })
});
