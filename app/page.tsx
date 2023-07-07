"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session : ", session);
  console.log("status : ", status);
  return (
    <div>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
      {session && session.user?.name}
    </div>
  );
}
