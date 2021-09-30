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
    fromsymbol: {
        type: String,
        default: ""
    },
    tosymbol: {
        type: String,
        default: ""
    },
    pairaddress: {
        type: String,
        default: ""
    },
    reverse: {
        type: Boolean,
        default: false
    },
    txid: {
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
    poolamount: {
        type: Number,
        default: 0
    },
    useraddress: {
        type: String,
        default: ""
    },
    buytype: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending"
    },
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = mongoose.model("liquity", TokenSchema, "liquity");

export default Token;