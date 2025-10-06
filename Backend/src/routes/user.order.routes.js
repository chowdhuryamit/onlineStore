import { Router } from "express";
import { addOrder,newOrders,orderFullfiled,oldOrders,deleteOrder} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/user.verify.moddleware.js";

const router=Router();

router.post('/placeOrder',addOrder);
router.get('/newOrders',verifyJWT,newOrders);
router.patch('/fullfillOrder',verifyJWT,orderFullfiled);
router.get('/oldOrders',verifyJWT,oldOrders);
router.delete('/deleteOrder',verifyJWT,deleteOrder);

export default router;