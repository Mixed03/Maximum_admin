import mongoose from "mongoose";

const DesignSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  sizes: [String],
  colors: [String],
  price: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  expense: { type: mongoose.Schema.Types.Decimal128, get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Design = mongoose.models.Design || mongoose.model("Design", DesignSchema);

export default Design;
