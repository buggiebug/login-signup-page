const UserModel = require("../database/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError");

//  //! Regex for Email & Password...
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//  //! Home Route...
exports.homeRoute = catchAsyncError(async(req,res,next)=>{
    return res.status(200).json({success:true,message:"API works..."});
});

//  //! Signup User...
exports.signupRoute = catchAsyncError(async(req,res,next)=>{

    const {name,email,password,confirmPassword} = req.body;
    
    if(String(name).length<3)
        return res.status(400).json({success:false,message:'Name should be 3 char long'});

    if(!String(email).match(validRegex))
        return res.status(400).json({success:false,message:'Invalid Email'});
        
    if(!password && !confirmPassword)
        return res.status(400).json({success:false,message:'Password is required'});

    if(String(password)!==String(confirmPassword))
        return res.status(400).json({success:false,message:'Password & Confirm Password mismatched'});

    if(String(password).length<8 || !password)
        return res.status(400).json({success:false,message:'Password must be 8 char long'});

    const isUser = await UserModel.findOne({email:String(email).toLowerCase()});
    if(isUser)
        return res.status(400).json({success:false,message:`${email} is already used`});
    
    const enpPass = await bcrypt.hash(String(password),10);
    const newUser = await UserModel.create({
        name,
        email:String(email).toLowerCase(),
        password:enpPass
    }) 

    const token = await jwt.sign({id:newUser._id},'this_is_secret_key');
    return res.status(200).json({success:true,token,message:"New account created"});
});

//  //! Login User...
exports.loginRoute = catchAsyncError(async(req,res,next)=>{

    const {email,password} = req.body;

    if(!String(email).match(validRegex))
        return res.status(400).json({success:false,message:'Invalid Email'});

    if(String(password).length<8 || !password)
        return res.status(400).json({success:false,message:'Password must be 8 char long'});

    const isUser = await UserModel.findOne({email:String(email).toLowerCase()}).select("+password");
    if(!isUser)
        return res.status(401).json({success:false,message:`Invalid username/password`});
    
    const decPass = await bcrypt.compare(password, isUser.password);
    if(!decPass)
        return res.status(401).json({success:false,message:`Invalid username/password`});

    const token = await jwt.sign({id:isUser._id},'this_is_secret_key');
    return res.status(200).json({success:true,token,message:"Logged In"});
});


//  //! Get User...
exports.userRoute = catchAsyncError(async(req,res,next)=>{
    const {token} = req.headers;
    try {
        if(!token)
            return res.status(401).json({success:false,message:"JWT token is required"});

        const decToken = await jwt.verify(token,'this_is_secret_key');
        const user = await UserModel.findById({_id:decToken.id});
        return res.status(200).json({success:true,user});
    } catch (error) {
        return res.status(401).json({success:false,message:error.message});
    }
});

//  //! Get All User...


//  //! Update a User...


//  //! Delete a User...

