import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerAddress: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    fullfilled: {
      type: Boolean,
      default: false,
    },
    products: [productSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("order", OrderSchema);

export { Order };
