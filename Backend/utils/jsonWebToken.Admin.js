import jwt from "jsonwebtoken";

const jsonSetToken = async(userid,res)=>{
  const token = jwt.sign({userid},process.env.SECRET_KEY_ADMIN,{expiresIn:"15d"});

  res.cookie("token_admin",token,{
    maxAge:1000*60*60*24*15, // 15 day
    httpOnly:true,
    sameSite:"strict",
    secure:process.env.NODE_ENV==="production",
  });
}

export default jsonSetToken;