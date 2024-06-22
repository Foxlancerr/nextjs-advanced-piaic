import bookList from "@/assets/data.json";
import { NextRequest, NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({
    success: "true",
    message: "list of available books",
    data: bookList,
  });
}

export function POST(request: NextRequest) {
  const data = request.json();
  console.log(data);
}
