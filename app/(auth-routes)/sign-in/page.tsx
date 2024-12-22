//'use client';
//import { useState, useEffect } from 'react';
import { signInAction } from '../../actions';
import Link from 'next/link';
//import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FormMessage, Message } from "@/components/form-message";

export default async function SignInPage(props: {
  searchParams: Promise<Message>;
}) {
    //const [passwordVisible, setPasswordVisible] = useState(false);

    const searchParams = await props.searchParams;;

    /*

    useEffect(() => {
      const getSearchParams = async () => {
        return await props.searchParams;
      }

      searchParams = getSearchParams();
    }, []);*/


    

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Login</h1>

          <form className="space-y-6">
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
                //type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                required
                className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-0.5"
                placeholder="• • • • • • • •"
              />
              <button
                type="button"
                //onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                //aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                //aria-pressed={passwordVisible}
                aria-controls="password"
              >
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
              formAction={signInAction}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
            <FormMessage message={searchParams} />
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-700">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
}