// components/Navbar.tsx
import Link from "next/link";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Navbar: React.FC = () => {
 
  return (
    <nav className="bg-slate-50 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <div className="flex">
        <Link href="/" className="items-center flex flex-row text-purple-600 text-2xl font-bold hover:text-purple-700">
          <GiForkKnifeSpoon/>
        
          Recipeasy
        </Link>
      </div>
      {/* Links */}
      <div className="flex space-x-6">
        <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">
          Contact
        </Link>
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
