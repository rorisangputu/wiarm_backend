import express from 'express';
import 'dotenv/config';

import dbConn from './services/db'

const app = express();


const StartServer = async () => {
   
    const PORT = process.env.PORT || 3000 

    await dbConn()

    app.listen(3000, () => {
        console.log(`Running app on port ${PORT}`)
    })
}

StartServer();


