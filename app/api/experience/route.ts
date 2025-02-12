import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/app/utils/dbConnect";
import experienceSchema from "@/models/experience.schema";


export async function POST(req: NextRequest){
    
    try {
        await connectDB();
        const body = await req.json();
        const {title, experience, company, user, status} = body;

        if(!title || !experience || !company){
            return NextResponse.json({
                message: "All fields are required",
                success: false
            },{status: 400})
        }

        const newExperience = {
            title,
            experience,
            company,
            user,
            status
        }

        const newExp = await experienceSchema.create(newExperience)

        return NextResponse.json({
            message: "Created Successfully",
            success: true,
            newExp
        },{status: 201})



    } catch (error) {
        console.log("Internal Server Error", error);
        return NextResponse.json({message: "Internal Server error"}, {status: 500});
    }
}


export async function GET (){

    try {
        await connectDB();

        const allExperience = await experienceSchema.find()

    return NextResponse.json(allExperience, {status: 200});

    } catch (error) {
        console.log("Internal Server error", error)
        return NextResponse.json({message: "Internal Server error"}, {status: 500});
    }
}


