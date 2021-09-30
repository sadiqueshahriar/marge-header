// import package
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    from: {
        type: String,
        default: "",
    },
    to: {
        type: String,
        default: "",
    },
    fromaddress: {
        type: String,
        default: "",
    },
    toaddress: {
        type: String,
        default: "",
    },
    fromlogo: {
        type: String,
        default: "",
    },
    tologo: {
        type: String,
        default: "",
    },
    address: {
        type: String, //lptoken
        default: "",
    },
    stakeaddress: {
        type: String, //staking contract
        default: "",
    },
    rewardtoken: {
        type: String,
        default: "",
    },
    stakestart: {
        type: Date,
    },
    stakeend: {
        type: Date,
    },
    rewardrate: {
        type: Number,
        default: 0,
    },
    price_from: {
        type: Number,
        default: 0,
    },
    price_to: {
        type: Number,
        default: 0,
    },
    supply: {
        type: Number,
        default: 0,
    },
    reserveA: {
        type: Number,
        default: 0,
    },
    reserveB: {
        type: Number,
        default: 0,
    },
    totalsupply: {
        type: Number,
        default: 0,
    },
    fromdecimal: {
        type: Number,
        default: 0,
    },
    todecimal: {
        type: Number,
        default: 0,
    },
    fromrate: {
        type: Number,
        default: 0,
    },
    torate: {
        type: Number,
        default: 0,
    },
    frompool: {
        type: Number,
        default: 0,
    },
    topool: {
        type: Number,
        default: 0,
    },
    totalliqutity: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: "pending", //pending, confirmed
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pairtype: {
        type: String,
        default: "pair",
    },
    precision: {
        type: Number,
        default: 0,
    },
    tokenInfo: {
        type: String,
        default: 0,
    },
    projectSite: {
        type: String,
        default: 0,
    },
    contract: {
        type: String,
        default: 0,
    },
    stakingFees: {
        type: Number,
        default: 0,
    },
    ReferalPyments: {
        type: Number,
        default: 0,
    },
});

const Token = mongoose.models["pairlist"] || mongoose.model("pairlist", TokenSchema, "pairlist");

export default Token;
