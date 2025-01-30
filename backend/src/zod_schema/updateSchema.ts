import z from 'zod'

export const updateSchema = z.object({
    password    : z.string().min(8).optional(),
    firstName   : z.string().max(30).optional(),
    lastName    : z.string().max(30).optional()
})