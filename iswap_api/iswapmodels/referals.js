// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaFormat = new Schema({
   
    address: {
        type: String,
        default: ""
    },
    referal: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Modelname = mongoose.model("referals", schemaFormat, "referals");

export default Modelname;