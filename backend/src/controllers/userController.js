import { User } from "../models/user/user.model.js";

export const getMydetails =async (req, res) => { 
    try{
    const userId=req.user.id;
    let user = await User.findById(userId);
     return res.status(200).send(user);
    }catch(err){
        console.error("Error fetching user details:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}