import Link from 'next/link';

export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-red-500">Recipeasy</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your ultimate destination for finding recipes and exploring cuisines. Whether you&apos;re hunting for the perfect dish or just looking to mix up your meal plan, Recipeasy makes it easy and fun.
        </p>
        <Link href="/form" className="inline-block px-6 py-3
         bg-red-500 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105 hover:bg-red-600">
            Let&apos;s Get Started
        </Link>
      </div>
    </div>
      

    </>
  );
}
