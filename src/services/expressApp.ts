import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default async (app: Application)=> {

    app.use(cookieParser())
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors())

    return app;
}