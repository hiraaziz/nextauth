import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
// export { default } from "next-auth/middleware";
export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export function middleware(request: NextRequest) {
  // const accesstoken = cookies().get("next-auth.session-token")?.value;
  // console.log("Middleware request : ", accesstoken);
}

export const config = {
  // matcher: ["/profile"],
  matcher: ["/dashboard"],
};
