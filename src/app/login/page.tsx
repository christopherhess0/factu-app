"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@factu.local");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else setError("Credenciales inválidas");
  };

  return (
    <main className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold">Ingresar</h1>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="border rounded p-2 w-full" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border rounded p-2 w-full" placeholder="Password" type="password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="bg-black text-white rounded px-4 py-2 w-full">
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
