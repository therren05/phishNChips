import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import csv from 'csv-parser';
import fs from 'fs';



const app = express();
const port = 1922;
app.use(cors());
var randomNumber = 0;
 


type emailFormat = {
    sender: string, 
    recipient: string,
    subject: string,
    body: string,
    timestamp: string, 
    urlLinks: boolean,
    isPhishing: boolean
}

const emails: emailFormat[] = [];
readAllCsvEmails().then(allEmails => {
    emails.push(...allEmails);
});

// Basic GET route
app.get('/', (req: Request, res: Response) => {

    const testEmail: emailFormat = {
        sender: "alice@example.com",
        recipient: "bob@example.com",
        subject: "Test Email",
        body: "This is a test email.",
        timestamp: new Date().toISOString(),
        urlLinks: false,
        isPhishing: false
    };
    res.status(200).json(emails.length);
});

// Example GET route
app.get('/email', (req: Request, res: Response) => {
    if (emails.length === 0) {
         res.status(404).json({ message: 'No emails found' });
    }else{
        randomNumber = Math.floor(Math.random() * emails.length);
         res.status(200).json(emails[randomNumber]);
    }
});

app.listen(port, () => {
    //console.log(`Server running at http://localhost:${port}`);
});
async function readAllCsvEmails(): Promise<emailFormat[]> {
  const csvFiles = [
    // './CEAS_08.csv',
    './Nazario.csv',
    //'./Nigerian_Fraud.csv',
    './SpamAssasin.csv'
  ];
    for (const file of csvFiles) {
        if (fs.existsSync(file)) {
            await new Promise<void>((resolve, reject) => {
                fs.createReadStream(file)
                    .pipe(csv())
                    .on('data', (row) => {
                        // Convert fields as needed
                        emails.push({
                            sender: row.sender ?? 'No Sender',
                            recipient: row.receiver ?? 'No Recipient',
                            timestamp: row.date ? sanitizeDate(row.date) : '',
                            subject: row.subject ?? 'No Subject',
                            body: row.body ?? 'No body',
                            urlLinks: row.urls === '1' || row.urls === 1 ? true : false,
                            isPhishing: row.label === '1' || row.label === 1 ? true : false
                        });
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });
        }
    }

    return emails;
}

function sanitizeDate(dateString: string): string {
    let sanitizedString = "";
    let stringArray: string[] = dateString.split(' ');
    if (stringArray.length < 4) {
        return dateString; // Return original if not enough parts
    }
    sanitizedString += stringArray[0] + " "+ stringArray[1] + " " + stringArray[2] + " "+ stringArray[3];
    return sanitizedString;
}