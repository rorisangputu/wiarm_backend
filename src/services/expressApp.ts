import express, { Application } from 'express';
import cors from 'cors';

export default async (app: Application)=> {

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors())

    return app;
}