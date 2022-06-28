import express from "express";
import { countUsers } from "../controllers/adminController";
import isAdmin from "../middleware/checkIsAdmin.js";

const router = express.Router();
router.use(isAdmin);
router.get("/admin/:id/count", countUsers) 
export default router;



