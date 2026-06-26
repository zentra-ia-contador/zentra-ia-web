'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const initSupabase = async () => {
      const { createClient } = await import('@supabase/supabase-js');
      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      setSupabase(client);
    };
    initSupabase();
  }, []);

  const handleSignUp = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (!error) {
      alert('Revisa tu correo para confirmar tu registro!');
      router.push('/login');
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">ZENTRA IA</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Registrarse</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@ejemplo.com"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>
        <button
          onClick={handleSignUp}
          disabled={loading || !supabase}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
        <p className="text-center text-gray-600 mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
