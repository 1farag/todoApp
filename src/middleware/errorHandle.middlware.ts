import { NextFunction, Response, Request ,  } from "express";



export function errorHandle(err: Error, req: Request, res: Response, next: NextFunction){

    res.status(500).json({
        success: false,
        message: err.message
    })
    
}