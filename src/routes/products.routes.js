import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import{
    getProducts,
    createProduct,
    getProduct,
    deleteProduct,
    editProduct
}from '../controllers/products.cotroller.js'
import { uploadImage } from "../middlewares/uploadlmage.middleware.js";

//importamo el validatoSchema
import { validateSchema } from "../middlewares/validator.middleware.js";
import { productSchema } from "../schemas/product.schemas.js";


const router = Router();
//obtener todos los productos
router.get('/products', authRequired,getProducts);

//agregar todos los producto
router.post('/products', authRequired, uploadImage, validateSchema(productSchema),createProduct);

//obtener un porducto por id 
router.get ('/products/:id', authRequired, getProduct);

//Eliminar un producto
router.delete('/products/:id', authRequired, deleteProduct);

//Actualizar un producto
router.put('/products/:id', authRequired, editProduct)

export default router;