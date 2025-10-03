import { promises } from "dns"

const asyncHandler = (requestHandler)=>{
    (req,res,next)=>{
        promises.resolve(requestHandler(req,res,next)).catch((err)=> next(err)) 
    }
}

export { asyncHandler }

//try catch thi kryu che 
// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message:err.message
//         })
//     }
// }