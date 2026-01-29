import user from '../../Models/User.js';
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