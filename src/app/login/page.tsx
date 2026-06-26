import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push('/dashboard');
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">ZENTRA IA</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Iniciar Sesión</h2>
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
          onClick={handleSignIn}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Iniciar Sesión
        </button>
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-blue-600 hover:underline">
            Empieza gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
