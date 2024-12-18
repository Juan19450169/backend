import mongoose from "mongoose";

const partsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        default: 0.0,
        required: true
    },
    year:{
        type: Number,
        default: 2024,
        required: true
    },
    amount:{
        type: Number,
        default: 0.0,
        require: true
    },
    image:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


export default mongoose.model('Parts', partsSchema);
