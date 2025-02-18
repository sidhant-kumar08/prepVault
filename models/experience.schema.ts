import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export interface ExperienceType extends Document {
    company: string;
    title: string;
    experience: string;
    user: string;
    status: "Selected" | "Rejected" | "Pending";
    upVote?: Number;
    downVote?: Number;
    comments: Array<{user: String, text: String}>
}


const experienceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Selected", "Rejected", "Pending"],
        default: "Pending"
    },
    upVote : {
        type : Number,
        default : 0,
    },
    downVote : {
        type : Number,
        default : 0
    },
    comments: [
        {
            user: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ]
},{timestamps: true})


export default mongoose.models.Experience || mongoose.model<ExperienceType>('Experience', experienceSchema)