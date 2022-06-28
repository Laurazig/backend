import express from "express";
// import { albumsPost } from "../controllers/albumsController.js";
// import authoriseUser from "../middleware/authoriseUser.js";
// import albumValidator from "../validators/albumValidator.js";
// import checkValidation from "../validators/checkValidation.js";
// import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.use(authoriseUser);

router.get("/admin/:id/count", getAdminData)

//router.post("/", requiredValues(["albumTitle", "band", "albumYear"]), albumValidator(), checkValidation, albumsPost);    // POST /albums

export default router;

Query.prototype.count()

const count = await User.countDocuments({})