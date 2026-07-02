import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido a Zentra IA</h1>
      <p className="text-lg text-gray-600 mb-8">Automatización inteligente para contadores independientes.</p>
      <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition duration-300">
        Iniciar Sesión
      </Link>
    </div>
  );
}
