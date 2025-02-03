import mongoose from "mongoose";
import { Schema, Document } from "mongoose";


export const resourceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    modules : [
        {
            title: {type: String, required: true},
            topics: [
                {
                    title: {type: String, required: true},
                    link: {type: String, required: true},
                }
            ]
        }
    ]
    
})


export default mongoose.models?.Resource || mongoose.model('Resource', resourceSchema);