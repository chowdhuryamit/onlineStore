import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Product } from "../models/product.model.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const addProduct = async (req, res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }

    const { name, description, category, price} = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "pallabShop/products",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);
    if (!result) {
      return res
        .status(400)
        .json({ success: false, message: "error while uploading image" });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      image: result.secure_url,
    });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "error while adding product" });
    }
    return res
      .status(200)
      .json({ success: true, message: "product added successfully", product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getProducts = async (req,res) =>{
    try {
        const {category} = req.query;
        if(!category){
            return res.status(400).json({success:false,message:"category is required"});
        }
        const products = await Product.find({category});
        if(!products){
            return res.status(400).json({success:false,message:"no products found"});
        }
        return res.status(200).json({success:true,message:"products fetched successfully",products});
    } catch (error) {
        return res.status(400).json({success:false,message:error.message});
    }
}

export { addProduct,getProducts };
