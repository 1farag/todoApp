import { z } from "zod";

const signUpSchema = {
    body: z.object({
        username: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(6).max(30),
    }).strict(),
};


const signinSchema = {
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6).max(30),
    }).strict(),
};

export const signUpValidation = z.object({
    ...signUpSchema,
});

export const signinValidation = z.object({
    ...signinSchema,
});