// import package

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PairListNewSchema = new Schema({
  token0: {
    type: String,
    default: "",
  },
  token0_hex: {
    type: String,
    default: "",
  },
  token0_logo: {
    type: String,
    default: "",
  },
  token0_website: {
    type: String,
    default: "",
  },
  token1: {
    type: String,
    default: "",
  },
  token1_hex: {
    type: String,
    default: "",
  },
  token1_logo: {
    type: String,
    default: "",
  },
  token1_website: {
    type: String,
    default: "",
  },
  index_no: {
    type: Number,
    default: 0,
  },
  pair: {
    type: String,
    default: "",
  },
  pair_hex: {
    type: String,
    default: "",
  },
  lastprice_Coin: {
    type: String,
    default: "",
  },
  change_24H: {
    type: String,
    default: "",
  },
  liquidity: {
    type: String,
    default: "",
  },
  volumen_24H: {
    type: String,
    default: "",
  },
  apy: {
    type: String,
    default: "",
  },
  lp_staking: {
    type: String,
    default: "",
  },
  aktiv: {
    type: Boolean,
    default: false,
  },
  verfid: {
    type: Boolean,
    default: false,
  },
});

const PairListNew = mongoose.model("pairlist_new", PairListNewSchema, "pairlist_new");

export default PairListNew;
