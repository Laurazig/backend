import express from "express";
import { getUserData, updateAlbums, deleteAlbums, deleteAlbum, deleteUser } from "../controllers/usersController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import authoriseUser from "../middleware/authoriseUser.js";

const router = express.Router();

router.use(authoriseUser)

router.get("/:id", getUserData);    // GET /users/1234

router.patch("/:id/albums", requiredValues(["id"]), checkValidation, updateAlbums);  // PATCH /users/1234/albums

router.delete("/:id/albums", deleteAlbums);    // DELETE /users/1234/albums

router.delete("/:id/albums/:albumId", deleteAlbum);  // DELETE /users/1234/albums/5678

router.delete("/:id", deleteUser);    // DELETE /users/1234

export default router;