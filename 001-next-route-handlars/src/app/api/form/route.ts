import { UserInfoValidateSchema } from "@/validation/formValidation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const zodResponse = UserInfoValidateSchema.safeParse(data);
  if (zodResponse.success) {
    return NextResponse.json({
      success: true,
      message: "successfully submitted",
      data,
    });
  } else {
    const zodError = zodResponse.error.issues;
    return NextResponse.json({
      success: false,
      message: "Zod validation error",
      error: zodError,
    });
  }
}
