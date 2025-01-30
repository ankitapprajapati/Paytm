import {z} from 'zod'

export const amountTranferSchema = z.object({
    amount  : z.number(),
    to      : z.string().email()
})