//Centralized error messaging
import { Request, Response, NextFunction } from "express"

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.stack)
    res.status(500).json({
        status: 500,
        message: "Something went wrong",
        error: error.message
    })

}