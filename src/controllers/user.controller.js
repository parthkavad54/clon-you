import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";




const registerUser = asyncHandler ( async (req,res)=>{
    // get user details from frontend
    //vaidation - not empty
    //check if user already exists: username , email
    //check for images , check for avtar
    //upload them to cloudinary , avtar
    //create user object  - create entry in DB
    // remove password and response token key from response
    //check for user creation
    //return response

    const {fullname, username, email, password} = req.body
    console.log("email: ",email);

    if ([fullname,username,email,password].some((feild)=>
        feild?.trim()==="")) // ek j sathe badhu check kre dey
    {
        throw new apiError(400,"All feild is required");
    }

    const existedUser= User.findOne({
        $or:[{username},{email}]
    })
    if (existedUser) {
        throw new apiError(409," user with username or email is already exists.")
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath) {
        throw new apiError(400,"avtar is required")
    }

    const avtar =await uploadOnCloudinary(avtarLocalPath);
    const coverImage =await uploadOnCloudinary(coverImageLocalPath);

    if (! avtar) {
        throw new apiError(400,"avtar is required")
    }

    const user = await User.create({
        fullname,
        avtar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password,

    })

    const createduser = await User.findById(user._id)
    .select(
        "-password -refreshToken"
    )
    if (! createduser) {
        throw new apiError(500,"something went wrong while register")
    }

    return res.status(200).json(
        new apiResponse(201,createduser,"user registered successfully")
    )

    // res.status(200).json({
    //     message:"ok",
    // })
})

export { registerUser }
