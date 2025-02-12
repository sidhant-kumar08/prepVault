import connectDB from "@/app/utils/dbConnect";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return NextResponse.json(
          { message: "Invalid credentials", success: false },
          { status: 401 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await userModel.create({
        email: email,
        password: hashedPassword,
      });
    }

    return NextResponse.json({ user, success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
