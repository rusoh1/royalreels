const { google } = require('googleapis')
const keys = require('./keys.json')
const scopes = ["https://www.googleapis.com/auth/spreadsheets"]

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    scopes
);

client.authorize((error, tokens) => {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Connected!");
        getRecords(client);
    }
});

async function getRecords(client) {
    const googleSheetApi = google.sheets({ version: 'v4', auth: client });
    const readOptions = {
        spreadsheetId: '',
        range: 'Data!A1:E5'
    };

    let dataFromSheet = await googleSheetApi.spreadsheets.values.get(readOptions);
    let allRecords = dataFromSheet.data.values;
    console.log(allRecords);
} 
