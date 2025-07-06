import jwt from 'jsonwebtoken';
import { config } from "../config.js";


export const protect = (req, res, next) => {
 try {
   const token = req.cookies.jwt;


   if (!token) {
     return res.status(401).send({ status: " token not found" });
   }


    const decoded = jwt.verify(token, config.JWT_SECRET);


    req.user = decoded;


    next()


 } catch (error) {
     console.log(error);
     return res.status(401).send({ status: " token not valid" });
 }
};
