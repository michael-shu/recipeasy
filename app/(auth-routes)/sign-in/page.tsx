'use client';
import { useState, useActionState } from 'react';
import { signInAction } from '../../actions';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormMessage} from "@/components/form-message";

export default function SignInPage() {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [signInState, signIn, signInPending] = useActionState(signInAction, {
      error: ""
  });

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Login</h1>

          <form 
          action={signIn}
          className="space-y-6">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
                style={{marginTop: "8px"}}
              />

              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              
              <div className="relative" style={{marginTop: "5px"}}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-0.5"
                placeholder="• • • • • • • •"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisible}
                aria-controls="password"
              >
              {(passwordVisible) ? <FaEye/> : <FaEyeSlash/>}
              </button>
              </div>


            <div className="flex items-center justify-between">
              <label htmlFor="remember" className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {signInPending ? <div className="inline-flex">
              <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"> 
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
              </div>
              : "Login"
}
            </button>
            <FormMessage message={signInState} />
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-700">
            Don&apos;t have an account yet?{' '}
            <Link href="/sign-up" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
}