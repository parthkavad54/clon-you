import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (! localFilePath) return null
        //upload file
        const response =await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        //file is upload successfully
        console.log("file is uploaded on cloudinary",response.url);
        //to unlink file 
        fs.unlink(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove local save file when upload is fails
        return null; 
    }
}


export { uploadOnCloudinary } 