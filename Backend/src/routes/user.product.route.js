import { Router } from "express";
import {upload} from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/user.verify.moddleware.js";
import { addProduct, getProducts,editProducts } from "../controllers/product.controller.js";

const router=Router();

router.post('/add',verifyJWT,upload.single('image'),addProduct);
router.get('/getProducts',getProducts)
router.post('/editProduct',verifyJWT,editProducts)

export default router;