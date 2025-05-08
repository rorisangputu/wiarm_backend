import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from '../admin/routes/admin.route'
export default async (app: Application)=> {

    app.use(cookieParser())
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors())

    app.use('/api/admin', adminRoutes )

    return app;
}