// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaFromat = new Schema({
    
    useraddress: {
        type: String,
        default: ""
    },
    supply: {
        type: Number,
        default: 0
    },
    totalsupply: {
        type: Number,
        default: 0
    },
    lptoken: {
        type: String, //lptoken
        default: ""
    },
    status:{
        type: String,
        default: "pending" //pending, confirmed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const modelName = mongoose.model("lptokenlist", schemaFromat, "lptokenlist");

export default modelName;