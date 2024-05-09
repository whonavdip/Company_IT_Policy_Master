
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
  const { CITPM_PolicyName, CITPM_SessionTimeOut, CITPM_FailAttempt, CITPM_PwdNeverExpiry, CITPM_PwdChangeDuration, CITPM_PwdNotificationDuration, CITPM_Status, CITPM_CreatedBy, CITPM_CreatedDateTime } = req.body;
  // console.log("RECIEVED DATA :",req.body)

  console.log("Received Data:", req.body); // Log the received data

  const query = `INSERT INTO company_it_policy.companyitpolicymaster(CITPM_PolicyName,CITPM_SessionTimeOut,CITPM_FailAttempt,CITPM_PwdNeverExpiry,CITPM_PwdChangeDuration,CITPM_PwdNotificationDuration,CITPM_Status,CITPM_CreatedBy,CITPM_CreatedDateTime)VALUES(?,?,?,?,?,?,?,?,?);`;

  connection.query(query, [CITPM_PolicyName, CITPM_SessionTimeOut, CITPM_FailAttempt, CITPM_PwdNeverExpiry, CITPM_PwdChangeDuration, CITPM_PwdNotificationDuration, CITPM_Status, CITPM_CreatedBy, CITPM_CreatedDateTime], (err, result) => {
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
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  })
});

app.get('/CITPM/PNAME/:policyName', (req, res) => {
  const policyName = req.params.policyName;
  console.log("PolicyName = ", policyName)
  let sql = "SELECT * FROM `company_it_policy`.`companyitpolicymaster` where CITPM_PolicyName='" + policyName + "';";
  connection.query(sql, function (err, results) {
    console.log(sql)
    if (err) throw err;
    res.send(results);
  })
  // res.json({ exists });
});

app.put('/CITPM/:id', (req, res) => {
  const { id } = req.params; // Get the ID from the request URL
  // const { value } = req.params; 
  // console.log(value)
  console.log(id)
  // let sql = 'UPDATE company_it_policy.companyitpolicymaster SET CITPM_Status=3 WHERE CITPM_PolicyID ='+id+' ;';
  let sql = 'UPDATE `company_it_policy`.`companyitpolicymaster`SET`CITPM_Status` = 3 WHERE `CITPM_PolicyID` =' + id + ' ;';
  connection.query(sql, (err, result) => {

    if (err) {
      console.error('Error updating data in SQL table:', err);
      res.status(500).json({ error: 'Failed to update data' });
      return;
    }
    console.log(sql)
    console.log('Data updated in SQL table:', result);
    res.status(200).json({ message: 'Data updated successfully' });
  });
  //res.send("sss")
})

app.post('/api/log', (req, res) => {
  const { module, action, userCode, isError } = req.body;
  if (isError) {
    logToFile(`[ERROR] ${module} ${userCode}: ${action}`, true);
  } else {
    logToFile(`${userCode}: ${module}  ${action}`);
  }

  res.sendStatus(200);
});


const logToFile = (logMessage, isError = false) => {
  const logDir = '/home/it/api/Logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Create directory if it doesn't exist
  }

  const today = new Date();
  const dateString = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD
  const logFileName = isError ? `errorlog_${dateString}.txt` : `logs_${dateString}.txt`;
  const logFilePath = path.join(logDir, logFileName);

  const timestamp = today.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
    fractionalSecondDigits: 3,
  });

  fs.appendFile(logFilePath, `[${timestamp}] ${logMessage}\n`, (err) => {
    if (err) {
      console.error(`Error writing to ${logFilePath}:`, err);
    }
  });
};

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
  connection.connect(function (err) {
    if (err) throw err;
    console.log("DATABASE CONNECTED");
  })
});
