import { signJwtAccessToken } from "@/lib/jwt";
import { db, authTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await db
    .select()
    .from(authTable)
    .where(eq(authTable.email, body.email));

  if (!user[0] || !(await compare(body.password, user[0].password))) {
    return new Response(JSON.stringify(null));
  }
  const { password, ...userWithoutpassword } = body;
  const accesstoken = signJwtAccessToken(userWithoutpassword);

  const result = {
    ...userWithoutpassword,
    accesstoken,
  };

  return new Response(JSON.stringify(result));
}
