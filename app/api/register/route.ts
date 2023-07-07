import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { db, authTable } from "@/lib/drizzle";
import { InferModel, and, eq, sql } from "drizzle-orm";

type authregister = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const { name, email, password }: authregister = await req.json();

    const hashed_password = await hash(password, 12);

    const user = await db
      .insert(authTable)
      .values({
        name: name,
        email: email,
        password: hashed_password,
      })
      .returning();

    return NextResponse.json({ res: user, status: 200 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
