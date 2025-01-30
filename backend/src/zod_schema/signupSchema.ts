import {z} from 'zod';

export const signupSchema = z.object({
    firstName  : z.string().max(30),
    lastName   : z.string().max(30).optional(),
    password    : z.string().min(8),
    email       : z.string().email()
})
