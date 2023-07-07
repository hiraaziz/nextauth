"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cookies } from "next/headers";

type sessiontype = {
  user: {
    email: string;
    accesstoken: string;
    iat: number;
    exp: number;
    jti: string;
  };
  expires: string;
};
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session : ", session);
  console.log("status : ", status);

  let sessionData: sessiontype | null;
  useEffect(() => {
    sessionData = session as sessiontype;
  }, []);

  async function getTokenverify() {
    const res = await fetch("/api/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData?.user?.accesstoken}`,
      },
    });
    console.log("Response from button click  : ", res);
    if (res.status === 200) {
      router.push("/dashboard");
    }
  }
  return (
    <div>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      <Link href="/register">Register</Link>
      {session && session.user?.name}
      <br />
      <button onClick={() => getTokenverify()}>Dashboard (Restricted)</button>
    </div>
  );
}
