import express from 'express';
import 'dotenv/config';

import dbConn from './services/db'
import App from './services/expressApp';

const app = express();


const StartServer = async () => {
   
    const PORT = process.env.PORT || 3000 
    await App(app);
    await dbConn();

    app.listen(3000, () => {
        console.log(`Running app on port ${PORT}`)
    });
}

StartServer();


