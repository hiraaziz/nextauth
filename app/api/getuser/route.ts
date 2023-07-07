import { verifyJwt } from "@/lib/jwt";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request, res: Response) {
  const accessToken = request.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  try {
    if (accessToken) {
      const decodedToken = verifyJwt(accessToken);

      console.log("Decoded token:", decodedToken);
    }
    return new Response(JSON.stringify(true));
  } catch (error) {
    console.error("Token decoding error:", error);
    return new Response(JSON.stringify(false));
  }
}
