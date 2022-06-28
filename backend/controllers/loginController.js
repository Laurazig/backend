import User from "../models/user.js";
import bcrypt from "bcryptjs";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const loginPost = async (req, res, next) => {
    const { username, password } = req.body;
    let found;
    try {
        found = await User.findOne({ username: username });
    } catch {
        return next(createError(500,"Database couldn't be queried. Please try again"));
    }
    // If we found a user in our db with the same login details as we received from the frontend...
    // Send that user's id back the frontend in the response for further processing
    if (found) {
        let isValidPassword;
       try{
        isValidPassword=await bcrypt.compare(password, found.password)
       }catch {
        return next(createError(500, "logging in failed. please try again"))
       }
       if(!isValidPassword){
        return next(createError(401, "incorrect password, please try again"))
       }
       //---------------------------
//create& issue JWT
let newToken;
try{
    newToken= jwt.sign({ id: found.id }, "myserversecretkey", {expiresIn: "1h"})
    res.cookie("dataCookie", newToken, {httpOnly: true,sameSite:"strict"})
} catch {
    return next (createError(500, "signup not completed"))
}
// console.log("Token", token) 
       //---------------------------
        res.json({ id: found._id, token: newToken });
    } else {
        return next(createError(401, "no user exists with this username, please try again."));
    }
}