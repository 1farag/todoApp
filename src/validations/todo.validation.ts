import { Types } from "mongoose";
import { z } from "zod";

export const createTodoValidation = z.object({
    body : z.object({
        title: z.string().min(3).max(30),
        description: z.string().min(3).max(100),
        user: z.string().refine((val) => Types.ObjectId.isValid(val), {
            message: "Invalid id",
        }),

}).strict(),
})


const updateTodoschema = {
    body : z.object({
        title: z.string().min(3).max(30),
        description: z.string().min(3).max(100),
        completed: z.boolean(),
        user: z.string().refine((val) => Types.ObjectId.isValid(val), {
            message: "Invalid id",
        })
    }).strict(),
}

const todoIdschema = {
    params: z.object({
        id: z.string().refine((val) => Types.ObjectId.isValid(val), {
            message: "Invalid id",
        }),

    })
}

const todoUserIdschema = {
    body : z.object({
        user: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid id",
    })
    }).strict(),
}

export const todoIdValidation = z.object({
    ...todoIdschema,
    ...todoUserIdschema
});


export const updateTodoValidation = z.object({
    ...todoIdschema,
    ...updateTodoschema
});

