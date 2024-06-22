import { NextRequest, NextResponse } from "next/server";
import bookList from "@/assets/data.json";

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const searchBookBasedonID = bookList.find((book) => book.id === Number(id));
  console.log(searchBookBasedonID);
  if (searchBookBasedonID) {
    return NextResponse.json({
      success: "true",
      message: "Book are available",
      data: searchBookBasedonID,
    });
  } else {
    return NextResponse.json({
      success: "false",
      message: "Book are not available",
      data: {},
    });
  }
}
