"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu state

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  if(status === "loading") return
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left Side - Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            Funder
          </span>
        </Link>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href={session? "/home" : "/"}
            className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
          >
            Home
          </Link>
          {session ? (
            <Link
              href={`/user/${session.user.email}`}
              className="text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-400"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link href="/about" className="text-gray-900 dark:text-white">
                About
              </Link>
              <Link href="/contact" className="text-gray-900 dark:text-white">
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Right Side - Hidden on Mobile, Visible on Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white rounded-lg px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-blue-500 text-white rounded-lg px-4 py-2">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-green-500 text-white rounded-lg px-4 py-2">
                  Signup
                </button>
              </Link>
            </>
          )}

          {/* Dark Mode Toggle (Hidden on Mobile) */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <IoSunny className="text-2xl" /> : <IoMoon className="text-2xl" />}
          </button>
        </div>

        {/* Hamburger Menu Button (Only on Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-4">
          <ul className="flex flex-col space-y-3">
            <Link href="/" className="text-gray-900 dark:text-white">
              Home
            </Link>
            {session ? (
              <Link href="/profile" className="text-gray-900 dark:text-white">
                Profile
              </Link>
            ) : (
              <>
                <Link href="/about" className="text-gray-900 dark:text-white">
                  About
                </Link>
                <Link href="/services" className="text-gray-900 dark:text-white">
                  Services
                </Link>
                <Link href="/contact" className="text-gray-900 dark:text-white">
                  Contact
                </Link>
              </>
            )}

            {/* Login, Signup, and Dark Mode Toggle - Only Inside Mobile Menu */}
            {!session ? (
              <>
                <Link href="/login">
                  <button className="w-full bg-blue-500 text-white rounded-lg px-5 py-2.5">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="w-full bg-green-500 text-white rounded-lg px-5 py-2.5">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500 text-white rounded-lg px-5 py-2.5"
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="w-full p-2 rounded-lg text-center bg-gray-200 dark:bg-gray-700"
            >
              {darkMode ? <IoSunny className="text-2xl" /> : <IoMoon className="text-2xl" />}
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
