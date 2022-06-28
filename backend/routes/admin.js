import express from "express";
import { countUsers } from "../controllers/adminController"
const router = express.Router();
router.use(authoriseUser);
router.get("/admin/:id/count", countUsers) // controller function 
export default router;



