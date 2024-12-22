import { signUpAction } from "../../actions";
import Link from "next/link";
import { FormMessage, Message } from "@/components/form-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  //const searchParams = await props.searchParams;
  const searchParams = await props.searchParams;
  if (Object.keys(searchParams).length !== 0) {
    console.log(searchParams);
    return (
      <div className="flex text-center h-screen sm:max-w-md place-self-center justify-center align-text-top gap-2 p-4">
        {Object.entries(searchParams).map(([key, value]) => (
        <div key={key}>
          <strong >{key}:</strong> {value}
        </div>
      ))}
      
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col items-center justify-center min-h-screen">
  <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-medium mb-2">Sign up</h1>
    <p className="text-sm text-gray-600 mb-6">
      Already have an account?{" "}
      <Link className="text-blue-600 font-medium underline" href="/sign-in">
        Sign in
      </Link>
    </p>

    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength={8}
          required
        />
      </div>

      <div>
        <label htmlFor="passwordConfirm" className="block mb-1 font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Your password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength={8}
          required
        />
      </div>

      <button
        type="submit"
        formAction={signUpAction}
        className="bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Sign up
      </button>

      <FormMessage message={searchParams} />
    </div>
  </div>
</form>
    </>
  );
}
