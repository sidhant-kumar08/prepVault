import connectDB from '@/app/utils/dbConnect';
import userModel from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';



export async function POST(req: NextRequest){
    await connectDB();
    const {email, password} = await req.json();
    console.log(email,password)
    try {
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return NextResponse.json({
                message: "User Already Exists",
                success: false
            },{status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            email: email,
            password: hashedPassword
        });


        return NextResponse.json({
            user,
            message: "User registered",
            success: true
        },{status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal Server Error",
        },{status: 500})
    }
}