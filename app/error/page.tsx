import Link from 'next/link';

export default function ErrorPage() {
  return (<div className="flex flex-col items-center justify-center min-h-screen">
    <div className="max-w-md w-full bg-black text-white text-lg rounded-md shadow p-6 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="mb-6">
        Something went wrong with your login attempt. Please try again or
        contact support if the issue persists.
      </p>
      <div className="flex space-x-4 justify-center">
        <Link href="/sign-in">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 border-white border">
            Try Logging In Again
          </button>
        </Link>
        <Link href="/">
          <button className="bg-white text-black border border-black px-4 py-2 rounded hover:bg-gray-200">
            Return Home
          </button>
        </Link>
      </div>
      <div className="mt-4 text-sm text-gray-500">

        Need help? <Link href="/contact" className="underline">Shoot me an email</Link>.
      </div>
    </div>
  </div>)
};