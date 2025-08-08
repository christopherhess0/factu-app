"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Usuario: {session?.user?.email ?? "-"}</p>
      <p>Rol: {(session as any)?.role ?? "-"}</p>
      <div className="space-x-3">
        <Link href="/">Inicio</Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="underline">
          Salir
        </button>
      </div>
    </main>
  );
}
