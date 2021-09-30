// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  username           : { type: String, default: '' },
  email              : { type: String, default: '' },
  password           : { type: String, default: '' },
  createdAt          : { type: Date, default: Date.now },
  updatedAt          : { type: Date, default: Date.now },
  last_login          : { type: Date, default: Date.now }
})

const Admin = mongoose.model("admin", TokenSchema, "admin");

export default Admin;

