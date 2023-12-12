import {Request, Response, NextFunction} from "express";
import { ZodEffects , AnyZodObject } from "zod";

export function validateRequest(schema: ZodEffects<AnyZodObject> | AnyZodObject ){

    return async function (req: Request, res: Response, next: NextFunction) {
        
        try {
            const {body , params, query} = req;
            
            const validValues = await schema.parseAsync({
                body,
                query,
                params      
            })
        
            req.body = validValues.body;
            req.query = validValues.query;
            req.params = validValues.params;
        
        }
        catch(err: any){     
           
            return res.status(400).json({  
                success: false,
                message: err.message
            })
        }
        
        return next()
    }

}