// components/Navbar.tsx
import Link from "next/link";

const Navbar: React.FC = () => {
 
  return (
    <nav className="bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-indigo-600 text-2xl font-bold hover:text-indigo-500">
          Recipeasy
        </Link>
      </div>
      {/* Links */}
      <div className="flex space-x-6">
        <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">
          About
        </Link>
        <Link href="/services" className="text-gray-700 hover:text-indigo-600 font-medium">
          Services
        </Link>
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
