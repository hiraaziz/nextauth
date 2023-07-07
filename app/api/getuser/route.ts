import { verifyJwt } from "@/lib/jwt";

export async function GET(request: Request, res: Response) {
  const accessToken = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");
  if (!accessToken) {
    return new Response(JSON.stringify("token is not provided"));
  }

  try {
    const decodedToken = verifyJwt(accessToken);
    if (!decodedToken)
      return new Response(JSON.stringify("token is invalid"), { status: 400 });

    return new Response(JSON.stringify("Valid token"));
  } catch (error) {
    console.error("Token decoding error:", error);
    return new Response(JSON.stringify("token is invalid"));
  }
}
