import connectDB from "@/app/utils/dbConnect";
import { Params } from "next/dist/server/request/params";
import { NextRequest, NextResponse } from "next/server";
import Resource from "@/models/resources.schema";

export async function GET (req : NextRequest, {params} : {params : {slug: string}}) {
    try {
        await connectDB();

        const {slug} = params;

        const resource = await Resource.findOne({title: slug}) 

        if(!resource) {
            return NextResponse.json({message: "Resource not found"}, {status: 404});
        }

        return NextResponse.json(resource, {status: 200})

    } catch (error) {
        console.log("Internal Server Error", error)
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}