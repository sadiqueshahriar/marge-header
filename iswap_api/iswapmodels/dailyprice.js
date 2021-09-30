// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    
    from: {
        type: String,
        default: ""
    },
    to: {
        type: String,
        default: ""
    },
    pairaddress: {
        type: String,
        default: ""
    },
    fromsymbol: {
        type: String,
        default: ""
    },
    tosymbol: {
        type: String,
        default: ""
    },
    
    fromamount: {
        type: Number,
        default: 0
    },
    toamount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = mongoose.model("dailyprice", TokenSchema, "dailyprice");

export default Token;