"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
const emails = [];
readAllCsvEmails().then(allEmails => {
    emails.push(...allEmails);
});
// Basic GET route
app.get('/', (req, res) => {
    const testEmail = {
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
app.get('/email', (req, res) => {
    if (emails.length === 0) {
        res.status(404).json({ message: 'No emails found' });
    }
    else {
        res.status(200).json(emails[Math.floor(Math.random() * emails.length)]);
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
async function readAllCsvEmails() {
    const csvFiles = [
        './CEAS_08.csv',
        './Nazario.csv',
        './Nigerian_Fraud.csv',
        './SpamAssassin.csv'
    ];
    for (const file of csvFiles) {
        if (fs_1.default.existsSync(file)) {
            await new Promise((resolve, reject) => {
                fs_1.default.createReadStream(file)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (row) => {
                    // Convert fields as needed
                    emails.push({
                        sender: row.sender ?? 'No Sender',
                        recipient: row.receiver ?? 'No Recipient',
                        timestamp: row.date ?? 'No Timestamp',
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
