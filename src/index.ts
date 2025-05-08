import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import queryDatabase from './services/db'

const app = express();

app.use(express.json());
app.use(cors())


const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
    queryDatabase();
})

//app.use(errorHandler)
app.listen(3000, () => {
    
    console.log(`Running app on port ${PORT}`)
})