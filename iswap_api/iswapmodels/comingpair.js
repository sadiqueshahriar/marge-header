// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    fromsymbol: {
        type: String,
        default: ""
    },
    tosymbol: {
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
    status:{
        type: String,
        default: "Active" //Active, Inactive
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date
    },
})

const Token = mongoose.model("comingpair", TokenSchema, "comingpair");

export default Token;