import { signJwtAccessToken } from "@/lib/jwt";

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (body && body.password === body.password) {
    const { password, ...userWithoutpassword } = body;
    console.log("user : ---------", userWithoutpassword);
    const accesstoken = signJwtAccessToken(userWithoutpassword);

    const result = {
      ...userWithoutpassword,
      accesstoken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
