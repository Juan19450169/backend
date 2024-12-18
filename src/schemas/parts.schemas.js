import {z} from 'zod';


export const partsSchema = z.object({
    name: z.string({
        required_error: 'Nombre de la refaccion requerido'
    }),
    price: z.string({
        required_error: 'Precio debe ser un numero'
    }).optional(),
    year: z.string({
        required_error: 'Año debe ser un numero '
    }).optional(),
    amount: z.string({
        required_error: 'Cantidad de Refacciones'
    }).optional()
})