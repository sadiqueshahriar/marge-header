// import package
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// import lib
import config from '../config/config';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    id: {
        type: String,
        default: ""
    },
    symbol: {
        type: String,
        default: ""
    },
    txid: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    from: {
        type: String,
        default: ""
    },
    to: {
        type: String,
        default: ""
    },
    fromlogo: {
        type: String,
        default: ""
    },
    tologo: {
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
    frombalance:{
        type: String,
        default: ""
    },
    tobalance:{
        type: String,
        default: ""
    },
    frompool:{
        type: Number,
        default: 0
    },
    topool:{
        type: Number,
        default: 0
    },
    fromdecimal: {
        type: String,
        default: ""
    },
    todecimal: {
        type: String,
        default: ""
    },
    round: {
        type: String,
        default: ""
    },
    balance: {
        type: String,
        default: ""
    },
    decimals: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = mongoose.model("token", TokenSchema, "token");

export default Token;