// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Stakingchema = new Schema({
    stakingAddress: {
        type: String,
        default: ""
    },
    totalstaking: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Token = mongoose.model("staking", Stakingchema, "staking");

export default Token;