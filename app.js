const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { google } = require('googleapis');
const express = require('express');
const app = express();
const port = 3000;

//const today = new Date();
//const year = today.getFullYear();
//const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0!
//const day = String(today.getDate()).padStart(2, '0');

//const filePath = `${year}-${month}-${day}_report_log.txt`;
//const content = "This is the content to be written to the file.\n";


const API_KEY = 'AIzaSyBTj0QiR10GO24u4krHPF7RSUOsjSK80g8';
const SHEET_ID = '1Pkd9pRR64oqXCrqcexndOmpcAKyjPzSHwExr4QRGrsY';
const newText = 'Hello, World!';
// Setting a route for the root URL
app.get('/', (req, res) => {
    // Authentication details from the Google Cloud Platform
const keys = {
  client_email: "forward-gserviceaccount-com@forward-fuze-404507.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWNG0qRHgivFX3\nmY52qyzfEBpoc/gt97AXWIktmKLLhfOafhO5PWd5VfxrbRyPM1pNPNpC38ebxr+4\n8DCioWYqy/WxHOnpe6qdheoiaDNpm0tdo3ScM+U9bJcU9yucBjxGHqQEQR/ZqpcW\nnNKla40Mr1YI6dnwegIFat9V6bprRk6Y81JQYRvB7RcxASzYB6mx3pRbijCN6lo+\n0UoCa1MFSxTFrjM4Fj3XoevBqhMbPLwXgoxmwrtAGSoCIDuMJWi0vJJ2aNd1zjEl\n/2szwoPGQjS+CfuYuLSzbluJ5Rlfc09RqjfN+N5BCs6mXsfAFk4QS3X8GPPzcolO\naN67stqRAgMBAAECggEACLZTFSpkgVOBbXEGOOL4r9287eVp8VMEYJ4KCKFEssww\n5qZXg/E19OWM9Gtt+KWSgqHLBfgJ1iGblpMqA+gBCqnRxVlrP/hhjbyz/jWt108O\nM0xqBQ3ny6DPwCCsT4aMkPS0qqnMQ2CYuqjYI6CtQ5gwjWuB1kdHby65T3UH5I5s\nCtSh/vBWNzhyZ7QOm1GXNdML+lqfKDNMw5r08uX6oY998d9+ZS0vFwIbPwK49a5D\nLtw6yA6eeO+LGu2YEp1JbYR9U3OObsq4DS1KNRgufEV0yvMNoR25IXQ0JJOXG0en\nSQBPNPxj6K83fSiDghhUz7llpm/XJ/aO2bgus5vgGQKBgQD4bkG7CKrTPuEQXcUq\nEBubky0E19vtLOel26Ty6Ombaq1ViQwRaRqMD8b5GsOKiEeQxgE3t7AAwERjA9Z7\nevUW6UM6m1tEvKIgbOjXj68QtTQ/hujB7SPjWj46SL+sO0R7I7sAQktTaBiCp8H+\ncL9IhgRBEijw/eVPIf6An2i/+QKBgQDcuzW6MzIJYDJYxfXgIVhJOZilIxQRr+NS\no6a057VofqspAJ81hkXdOoNGQo6krNnuSOwFrtrINj0U1j57PwBmNMpVFpLL5N41\nH9WzUUBuyxg4VS1f9UhWesQdczFjyjQ5kDgFC0Efa0CLk9CtIKnkwcogQMdyDYuU\nl89FD1pFWQKBgQC2xp/TlI/h9bwuh17dEJbPQlv32Ty0ZbpUm6HjGZttvfGjIb5g\nPNzMOXthoOBG1vcYO6V/scRq+QoXcyZlGNSjM6FDyDNBAiuiAZ7ZoZvihf7X0lED\nBI7H4Ygw538ln0FF+8bEbQHwboDB99zRb3A8UmVk3pCCpboFG3SceyvdOQKBgDF/\nKYUfhdDkaWXOvlwMHigNalVdkFqG/orBd9iJPPy5qtf+87Sk73W0cUuIEUSMHjJ4\n17ROiXDr+LZ7dHdeoVBJ9jUuYqymHc373YfgaHpvwHahYxNphVcfIGsaMbEW3q8p\nz+YRqADLpCWod9rawD4z1od0/0RsFSi1Ah2SW8PBAoGBALskuCMvhxHexJJTOkda\nVAPeKl/EEme/7QorMQb3r5gTu9sEHcvAJrq/3106gayo9DlXaQFZGO+Cx60+6Go9\nAVBJN+RlP+1RicnN2PixRglxLcSatxF5xbWP5WtLueOMHpgGqdPSh5jD2zuyykZO\nyVobFs7+DsHbb1T93FuvaUwg\n-----END PRIVATE KEY-----\n",
};

// Spreadsheet ID and range to write to
const spreadsheetId = '1Pkd9pRR64oqXCrqcexndOmpcAKyjPzSHwExr4QRGrsY';
const range = 'Sheet1!A1'; // Change this to the desired cell

// Value to write
const valueToWrite = 'Hello, World!';

// Google Sheets API initialization
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']);

client.authorize(function(err, tokens) {
  if (err) {
    console.error('Authorization failed:', err);
    return;
  }
  const sheets = google.sheets({ version: 'v4', auth: client });

  sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
    resource: {
      values: [[valueToWrite]],
    },
  }, (err, response) => {
    if (err) {
      console.error('The API returned an error: ' + err);
      return;
    } else {
      console.log('Value updated successfully!');
    }
  });
});
    // fs.appendFile(filePath, content, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log('File has been written');
    //   });

  res.send('Hello, this is a simple Express.js app!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





