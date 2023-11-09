const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { google } = require('googleapis');
const express = require('express');
const app = express();
const port = 3000;
let GoogleClient = require('./GoogleSheet')
GoogleClient.initClicent();
app.get('/', (req, res) => {
  //GoogleClient.addSheetToSpreadsheet("2023-11-09");
  GoogleClient.writeValue("2023-11-09!B1", "Here is the test result")
  res.send('Hello, this is a simple Express.js app!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





