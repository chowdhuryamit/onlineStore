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

    const totalAmount = savedOrder.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    const messageText = `New Order Placed

Customer: ${savedOrder.customerName}
Address: ${savedOrder.customerAddress}
Phone: ${savedOrder.customerPhone}

Products:
${savedOrder.products
  .map((p, i) => `  ${i + 1}. ${p.name}  |  Qty: ${p.quantity}  |  ₹${p.price}`)
  .join("\n")}

Total Amount: ₹${totalAmount}`;

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        { chat_id: process.env.CHAT_ID, text: messageText }
      );

      return res.status(200).json({
        success: true,
        message: "Order placed successfully",
        messageText,
      });
    } catch (error) {
      await Order.findByIdAndDelete(savedOrder._id);
      return res.status(400).json({
        success: false,
        message: "Error while sending notification.try again",
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const newOrders = async (req, res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }
    const orders = await Order.find({ fullfilled: false }).sort({
      createdAt: 1,
    });
    return res
      .status(200)
      .json({ success: true, message: "new orders are here", orders });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const oldOrders = async (req, res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }
    const { page = 1, limit = 5 } = req.query;
    const parsedLimit = parseInt(limit, 10);
    const pageSkip = (parseInt(page, 10) - 1) * parsedLimit;

    const orders = await Order.find({ fullfilled: true })
      .sort({ createdAt: 1 })
      .skip(pageSkip)
      .limit(parsedLimit);
    const totalDocuments = await Order.countDocuments({ fullfilled: true });
    const totalPages = Math.ceil(totalDocuments / parsedLimit);

    return res.status(200).json({
      success: true,
      message: "old orders are here",
      orders,
      totalPages,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const orderFullfiled = async (req, res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }
    const { orderId } = req.body;
    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { fullfilled: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res
        .status(400)
        .json({ success: false, message: "error while updating order" });
    }
    return res
      .status(200)
      .json({ success: true, message: "order marked as fullfilled" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "order id is required" });
    }
    await Order.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { addOrder, newOrders, orderFullfiled, oldOrders, deleteOrder };
