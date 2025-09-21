import { Router } from "express";
import { userLogin, userLogout } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/user.verify.moddleware.js";

const router=Router();

router.post('/login',upload.none(),userLogin);
router.post('/logout',verifyJWT,userLogout);


export default router;