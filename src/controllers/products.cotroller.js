import Products from '../models/products.models.js';
import {unlink} from 'fs';
import path from 'path';



//funcion para obtener todos los productos  // falta
export const getProducts = async(req, res)=>{
    try {
        const products = await Products.find({user: req.user.id});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al obtener los productos']});
    }
    
};// fin de getProducts


//funcion para crear un producto 
export const createProduct = async(req, res)=>{
    try {
        if(!req.file.filename){
            return res.status(500).json({message: ['Error al crear un producto, no se encontro la imagen ']})
        }

        const {name, price, year, amount} = req.body;
        const newProduct = new Products({
            name,
            price,
            year,
            amount,
            image: req.file.filename,
            user: req.user.id
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al crear un producto']});
    }
};// fin de createPorduct



//funcion para obtner un producto 
export const getProduct = async (req, res)=>{
    try {
        const product =await Products.findById(req.params.id);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al obtner un producto']});
    }
};

// funcion para eliminar un producto 
export const deleteProduct = async (req, res)=>{
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']})
        
        const image = product.image;
        const ruta = path.resolve('./src/public/img')+"/"+image;
        unlink(ruta, (err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen']})
        })
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al eliminar un producto']});
    }
};

// funcion para editar un producto 
export const editProduct =async (req, res)=>{
    try {
        // obtenemos la imagen actualizada dle producto 
        if(!req.file.filename){
            console.log("No se econtro la imagen ");
            return res.status(500).json({message: ['Error al actulizar un producto, no se encontro la imagen']})
        }
        const data =({
               name:req.body.name,
               price: req.body.price,
               year: req.body.year,
               amount: req.body.amount,
               image: req.file.filename,
               user: req.user.id
        });

        const product =await Products.findByIdAndUpdate(req.params.id, req.body);
        if(!product)
            return res.status(404).json({message: ['Producto no encontrado']});
        const image = product.image;

        const ruta = path.resolve('./src/public/img')+"/"+image;
                unlink(ruta, (err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen del producto actualizado ']})
        })
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al actualizar un producto'});
    }
};

