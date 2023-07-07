import { verifyJwt } from "@/lib/jwt";

export async function GET(request: Request, res: Response) {
  const accessToken = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  try {
    if (accessToken) {
      const decodedToken = verifyJwt(accessToken);
      if (!decodedToken)
        return new Response(JSON.stringify(false), { status: 400 });
      console.log("Decoded token:", decodedToken);
    }
    return new Response(JSON.stringify(true));
  } catch (error) {
    console.error("Token decoding error:", error);
    return new Response(JSON.stringify(false));
  }
}
