// components/Navbar.tsx
import Link from "next/link";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { createClient } from "@/utils/supabase/server";

const Navbar: React.FC = async () => {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="bg-slate-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="items-center flex flex-row text-purple-600 text-2xl font-bold hover:text-purple-700">
              <GiForkKnifeSpoon />

              Recipeasy
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">
              Contact
            </Link>
          </div>
          <div className="space-x-2">
            {(!user) ?
              <>
                <button
                  disabled
                  className="bg-black hover:bg-gray-800 px-2 text-sm text-white p-2 rounded-md hover:opacity-90"
                >
                  <Link href="/sign-in">Sign in</Link>
                </button>
                <button
                  disabled
                  className="bg-white hover:bg-gray-100 px-2 text-sm text-black border border-black p-2 rounded-md hover:opacity-90"
                >
                  <Link href="/sign-up">Sign up</Link>
                </button></> :
              <button> <Link href="/profile">Profile</Link></button>
            }

          </div>
        </div>
      </div>
    </nav>

  );

};

export default Navbar;
