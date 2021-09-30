// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    
    address: {
        type: String,
        default: ""
    },
    poolamount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = mongoose.model("users", TokenSchema, "users");

export default Token;