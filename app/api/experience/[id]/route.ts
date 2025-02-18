import connectDB from "@/app/utils/dbConnect";
import { auth } from "@/auth";
import experienceSchema from "@/models/experience.schema";
import exp from "constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  connectDB();
  const { id } = await params;

  try {
    const response = await experienceSchema.findById(id);

    if (!response) {
      return NextResponse.json(
        {
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.log("Internal server error", error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      {
        message: "id not found",
      },
      { status: 404 }
    );
  }

  try {
    await connectDB();

    const body = await req.json();
    const { comment, user } = body;

    if (!comment || !user) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const experience = await experienceSchema.findById(id);

    if(!experience){
      return NextResponse.json({message: "Experience not found"},{status: 404});
    }


    experience.comments.push({user: user, text: comment});
    await experience.save();

    return NextResponse.json(
      {
        message: "Updated Successfully",
        experience: experience,
        success : true
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal server error", error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const { id } = params;

    const { voteType } = await req.json();

    if (voteType !== "upVote" && voteType !== "downVote") {
      return NextResponse.json(
        { message: "Invalid Vote type" },
        { status: 400 }
      );
    }

    const updatedExperience = await experienceSchema.findByIdAndUpdate(
      id,
      { $inc: { [voteType]: 1 } },
      { new: true }
    );

    if (!updatedExperience) {
      return NextResponse.json(
        { message: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedExperience, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      {
        message: "id not found",
      },
      { status: 404 }
    );
  }

  try {
    await connectDB();

    const deletedExperience = await experienceSchema.findByIdAndDelete(id);

    if (!deletedExperience) {
      return NextResponse.json(
        {
          message: "Experience Not Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal server error", error);
    return NextResponse.json(
      { message: "Internal Server error" },
      { status: 500 }
    );
  }
}
