import { Router } from "express";
import User from "../models/userModel.js";

import { getUsers } from "../controllers/userController.js";

const router = Router();

router.get('/getUsers', getUsers);

export default router;