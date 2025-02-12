import { generateText } from "@/lib/geminiApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userPrompt } = await req.json();

    const response = await generateText(userPrompt);
    return NextResponse.json({ response });
  } catch (error) {
    console.log(error);
  }
}
