import { hashPassword } from "./../../../../utils/securePassword";
import { User } from "@/database/Models/userModel";
import { dbConnect } from "@/database/connectDb";
import { SignUpUserValidateSchema } from "@/validation/formValidation";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("called");
    const { email, password, username } = await request.json();

    const zodResponse = SignUpUserValidateSchema.safeParse({
      email,
      password,
      username,
    });

    if (!zodResponse.success) {
      const zodError = zodResponse.error.issues;
      return NextResponse.json({
        success: false,
        message: "Zod validation error",
        error: zodError,
      });
    }

    await dbConnect();

    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json({
        success: false,
        message: `User already exists in database with ID: ${existUser._id}`,
        data: {
          id: existUser._id,
        },
      });
    }

    const securePassword = await hashPassword(password); // Ensure hashPassword returns a promise if it's an async function
    const newUser = new User({ username, email, password: securePassword });
    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: { username, email },
    });
  } catch (error: any) {
    console.error("Error during sign up:", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
