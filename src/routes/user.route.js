import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
//midelware
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router();

router.route("/register").post(
    //for filed
    upload.fields([
        {
            name:"avtar",
            maxCount:1,
        },
        {
            name:"coverImage",
            maxCount: 2,
        },
    ]),
    registerUser
)


export default router