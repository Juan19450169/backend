import{productsSchema} from "../schemas/product.schemas.js";
import {partsSchema} from "../schemas/parts.schemas.js"
import { uploadImage } from "../middlewares/uploadlmage.middleware.js";
import { Router } from "express";


const router = Router();