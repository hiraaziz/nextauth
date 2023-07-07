"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("session : ", session);

  async function getTokenverify() {
    if (!session?.user?.accesstoken) console.log("unauthorize request");
    else {
      const res = await fetch("/api/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accesstoken}`,
        },
      });
      console.log("Response from button click  : ", res);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    }
  }
  return (
    <div>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      <br />
      <Link href="/register">Register</Link>
      <br />
      <h1>Email : {session && session.user?.email}</h1>
      <br />
      <button onClick={() => getTokenverify()}>Dashboard (Restricted)</button>
    </div>
  );
}
