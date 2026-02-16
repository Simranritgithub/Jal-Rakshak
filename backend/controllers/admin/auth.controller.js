import user from '../../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Ashaworker from '../../Models/Ashaworker.js';
export const register =async(req,res)=>{
  try {
    const {name,email,role,password}=req.body;
    const existuser = await user.findOne({email});
    if(existuser){
      return res.status(400).json({
        success:false,
        message:"user already exists"
      })
    }
      if(role==="Admin"){ const adminexists=await user.findOne({role:"Admin"})
      if(adminexists){
        return res.status(400).json({
          success:false,
          message:"Admin already exists"
        })
      }
}
     
    
    const hashed_password=await bcrypt.hash(password,10);
    const register=await user.create({
      name,email,role,password:hashed_password
    });

    return res.status(201).json({
      success:true,
      message:"user registered successfully",
      register
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Check email exists
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    let hasprofile=false;
    if( existingUser.role==="Admin"){
      const Profile=await Ashaworker.findOne({AshaworkerId:existingUser._id});
      if(Profile){
      hasprofile=true;}
    
    }
     if( existingUser.role==="Asha worker"){
      const Profile=await Ashaworker.findOne({AshaworkerId:existingUser._id});
      if(Profile){
      hasprofile=true;
    }
    
    }
    console.log("hasprofile",hasprofile);

    // 🔹 Generate token
    const token = jwt.sign(
  { id: existingUser._id, role: existingUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

// ✅ COOKIE SET HERE
res.cookie("accessToken", token, {
  httpOnly: true,        // ❌ JS access nahi
  secure: process.env.NODE_ENV === "production", // HTTPS in prod
  sameSite: "strict",    // CSRF protection
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

return res.status(200).json({
  success: true,
  message: "Login successful",
  user: {
    id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    hasprofile
  }
});
  }
catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const authme=async(req,res)=>{
  try {
    const userId=req.userId;
    const userData=await user.findById(userId).populate("name email role");
    if(!userData){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    return res.status(200).json({
      success:true,
      user:userData
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}