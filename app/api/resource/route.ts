import connectDB from "@/app/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Resource from "@/models/resources.schema";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {title, modules} = body;

        if(!title || !modules) {
            return NextResponse.json({message: "please fill all fields"},{status: 400});
        }

        const newResource = new Resource({
            title,
            modules,
        })


        await newResource.save()

        return NextResponse.json({message: "Resource added Successfully", data: newResource}, {status: 201});

    } catch (error) {
        console.log("Internal Server Error", error)
    }
}


export async function GET () {
    try {
        await connectDB();


        const resources = await Resource.find()


        return NextResponse.json(resources, {status: 200});
    } catch (error) {
        console.log("Internal Server Error", error);
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
}