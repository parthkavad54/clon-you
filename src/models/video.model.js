import mongoose, {Schema} from "mongoose";
import { ref } from "process";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type:string, //cloudinary url
            requried:true,
        },
        thumbnail:{
            type:string, //cloudinary url
            requried:true,
        },
        title:{
            type:string,
            requried:true,
        },
        description:{
            type:string,
            requried:true,
        },
        duration:{
            type:Number, //cloudinary url
            requried:true,
        },
        views:{
            type:Number, //cloudinary url
            default:0,
        },
        isPublished:{
            type:Boolean, //cloudinary url
            default:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    },
    {
        timestamps:true,
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video =mongoose.model("Video",videoSchema)

