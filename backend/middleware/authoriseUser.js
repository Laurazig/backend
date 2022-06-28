import jwt from "jsonwebtoken";
import createError from "http-errors"

const authoriseUser = (req,res,next) =>{
    let token;
    try {
        token = req.headers.authorisation.split(" ")[1]; //grab token
        if(!token){      
            throw new Error("user unauthorised")
        }
        const decodedToken = jwt.verify(token, "myserversecretkey");//token exists
        console.log("decoded token", decodedToken);
        next() //valid
    } catch (err){   //varify
        next(createError(403,"user could not be authorised"))
    }
}
export default authoriseUser