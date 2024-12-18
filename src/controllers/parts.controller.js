import Parts from '../models/parts.models.js';
import {unlink} from 'fs';
import path from 'path';



//funcion para obtener todas las refacciones  // falta
export const getParts = async(req, res)=>{
    try {
        const parts = await Parts.find({user: req.user.id});
        res.json(parts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al obtener los productos']});
    }
    
};// fin de getParts


//funcion para crear una refaccion
export const createParts = async(req, res)=>{
    try {
        if(!req.file.filename){
            return res.status(500).json({message: ['Error al crear la refaccion, no se encontro la imagen ']})
        }

        const {name, price, year,amount} = req.body;
        const newParts = new Parts({
            name,
            price,
            year,
            amount,
            image: req.file.filename,
            user: req.user.id
        });
        const savedParts = await newParts.save();
        res.json(savedParts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al crear la refaccion']});
    }
};// fin de createParts



//funcion para obtner una refaccion 
export const getPart= async (req, res)=>{
    try {
        const parts =await Parts.findById(req.params.id);
        if(!parts)
            return res.status(404).json({message: ['Refaccion no encontrada']});
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al obtner la refaccion']});
    }
};

// funcion para eliminar una refaccion 
export const deleteParts = async (req, res)=>{
    try {
        const parts = await Parts.findByIdAndDelete(req.params.id);
        if(!parts)
            return res.status(404).json({message: ['Refaccion no encontrado']})
        const image = parts.image;

        const ruta = path.resolve('./src/public/img')+"/"+image;
        unlink(ruta, (err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen']})
        })
        res.json(parts);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: ['Error al eliminar una refaccion']});
    }
};

// funcion para editar una Refaccion
export const editParts =async (req, res)=>{
    try {
        // obtenemos la imagen actualizada de la refaccion 
        if(!req.file.filename){
            console.log("No se econtro la imagen ");
            return res.status(500).json({message: ['Error al actulizar una refaccion, no se encontro la imagen']})
        }
        const data =({
               name:req.body.name,
               price: req.body.price,
               year: req.body.year,
               amount: req.body.amount,
               image: req.file.filename,
               user: req.user.id
        });

        const parts =await Parts.findByIdAndUpdate(req.params.id, req.body);
        if(!parts)
            return res.status(404).json({message: ['Refaccion no encontrado']});
        const image = parts.image;

        const ruta = path.resolve('./src/public/img')+"/"+image;
                unlink(ruta, (err)=>{
            if(err)
                return res.status(404).json({message: ['Error al eliminar la imagen de la refaccion actualizada ']})
        })
        res.json(parts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Error al actualizar una refaccion'});
    }
};

