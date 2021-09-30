// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaFromat = new Schema({
  router: { type: String, default: '' },
  factory: { type: String, default: '' },
  wtrx: { type: String, default: '' },
  distribution: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const modelName = mongoose.model("settings", schemaFromat, "settings");

export default modelName;