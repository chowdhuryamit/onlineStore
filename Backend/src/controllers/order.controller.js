import { Order } from "../models/order.model.js";
import axios from "axios";

const addOrder = async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || !order.products || order.products.length <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Order is empty" });
    }

    const savedOrder = await Order.create(order);

    if (!savedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "Error while placing order" });
    }

    const messageText = `New Order Placed:\nCustomer: ${
      savedOrder.customerName
    }\nAddress: ${savedOrder.customerAddress}\nPhone: ${
      savedOrder.customerPhone
    }\nProducts: ${savedOrder.products
      .map((p) => `${p.name} (Qty: ${p.quantity}) (₹${p.price})`)
      .join(", ")}`;

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        { chat_id: process.env.CHAT_ID, text: messageText }
      );
      return res
        .status(200)
        .json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      await Order.findByIdAndDelete(savedOrder._id);
      return res.status(400).json({
        success: false,
        message: "Error while sending Telegram notification",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const newOrders = async (req,res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
        return res.status(400).json({ success: false, message: "invalid user" });
    }
    const orders = await Order.find({ fullfilled: false }).sort({ createdAt: 1 });
    return res.status(200).json({ success: true,message:"new orders are here", orders });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

const oldOrders = async (req,res) => {
    try {
      if (!req.email || req.email !== process.env.EMAIL) {
          return res.status(400).json({ success: false, message: "invalid user" });
      }
      const orders = await Order.find({ fullfilled: true }).sort({ createdAt: 1 });
      return res.status(200).json({ success: true,message:"old orders are here", orders });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

const orderFullfiled = async (req,res) =>{
    try {
        if (!req.email || req.email !== process.env.EMAIL) {
            return res.status(400).json({ success: false, message: "invalid user" });
        }
        const {orderId} = req.body;
        if(!orderId){
            return res.status(400).json({ success: false, message: "orderId is required" });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId,{fullfilled:true},{new:true});
        if(!updatedOrder){
            return res.status(400).json({ success: false, message: "error while updating order" });
        }
        return res.status(200).json({ success: true, message: "order marked as fullfilled" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export { addOrder,newOrders,orderFullfiled,oldOrders };
