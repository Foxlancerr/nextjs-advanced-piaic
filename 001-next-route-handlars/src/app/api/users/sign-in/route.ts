import { User } from "@/database/Models/userModel";
import { dbConnect } from "@/database/connectDb";
import { comparePassword } from "@/utils/securePassword";
import { SignInUserValidateSchema } from "@/validation/formValidation";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// export async function POST(request: NextRequest) {
//   console.log("called");
//   const { email, password } = await request.json();
//   const zodResponse = SignInUserValidateSchema.safeParse({ email, password });
//   if (zodResponse.success) {
//     // await dbConnect();
//     const dbUser = await User.findOne({ email });
//     const passwordVerify = await comparePassword(password, dbUser?.password);
//     if (!passwordVerify) {
//       return NextResponse.json({
//         success: false,
//         message: "unAuthorized user",
//         data: {},
//       });
//     }

//     const tokenPayload = {
//       name: dbUser?.name,
//       id: dbUser?._id,
//     };

//     const token = jwt.sign(tokenPayload, process.env.PRIVATE_KEY as string, {
//       expiresIn: "1d",
//     });

//     const response = NextResponse.json({
//       success: true,
//       message: "User login successfully",
//       data: {
//         userId: dbUser?._id,
//       },
//     });

//     response.cookies.set("access_token", token);
//     return response;
//   } else {
//     const zodError = zodResponse.error.issues;
//     return NextResponse.json({
//       success: false,
//       message: "Zod validation error",
//       error: zodError,
//     });
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const zodResponse = SignInUserValidateSchema.safeParse({ email, password });

    if (!zodResponse.success) {
      const zodError = zodResponse.error.issues;
      return NextResponse.json({
        success: false,
        message: "Zod validation error",
        error: zodError,
      });
    }

    await dbConnect();

    console.log("called>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<")
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return NextResponse.json({
        success: false,
        message: `User not found`,
        data: {},
      });
    }

    console.log(existUser)

    const passwordVerify = await comparePassword(password, existUser?.password);
    if (!passwordVerify) {
      return NextResponse.json({
        success: false,
        message: "unAuthorized user",
        data: {},
      });
    }

    const tokenPayload = {
      name: existUser?.name,
      id: existUser?._id,
    };

    const token = jwt.sign(tokenPayload, process.env.PRIVATE_KEY as string, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      message: "User login successfully",
      data: {
        userId: existUser?._id,
      },
    });

    response.cookies.set("access_token", token);
    return response;
  } catch (error: any) {
    console.error("Error during sign up:", error.message);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
