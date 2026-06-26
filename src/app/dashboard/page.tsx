import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido al Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Has iniciado sesión correctamente.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition duration-300">
        Ir a la página principal
      </Link>
    </div>
  );
}
