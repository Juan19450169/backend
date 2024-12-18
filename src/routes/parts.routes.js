import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import{
    getParts,
    createParts,
    getPart,
    deleteParts,
    editParts
}from '../controllers/parts.controller.js'
import { uploadImage } from "../middlewares/uploadlmage.middleware.js";

//importamo el validatoSchema
import { validateSchema } from "../middlewares/validator.middleware.js";
import { partsSchema } from "../schemas/parts.schemas.js";


const router = Router();
//obtener todas las Refacciones
router.get('/parts', authRequired,getParts);

//agregar todas las Refacciones
router.post('/parts', authRequired, uploadImage, validateSchema(partsSchema),createParts);

//obtener una refaccion por id 
router.get ('/parts/:id', authRequired, getPart);

//Eliminar una refaccion
router.delete('/parts/:id', authRequired, deleteParts);

//Actualizar una refaccion
router.put('/parts/:id', authRequired, editParts)

export default router;