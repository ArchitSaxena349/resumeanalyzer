import React from "react";
import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <nav
      className="container flex items-center
    justify-between py-4 lg:px-8 px-2 mx-auto"
    >
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex gap-2 items-center">
          <FileText
            className="w-6 h-6 
        lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition
        duration-200 ease-in-out"
          />
          <span
            className="font-extrabold
          lg:text-xl text-gray-900"
          >
            Sonnarie
          </span>
        </NavLink>
      </div>

      <div
        className="flex lg:justify-center 
      lg:gap-2 lg:items-center text-gray-600 font-semibold  "
      >
        <NavLink href="/pricing">Pricing</NavLink>
        {
          <SignedIn>
            {" "}
            <NavLink href="/dashboard" >Your Summaries</NavLink>
          </SignedIn>
        }

        <div className=" flex lg:justify-end ld:flex-1 ">
          <SignedIn>
            <div className="flex gap-4 items-center">
              <NavLink href="/upload">Upload a PDF</NavLink>
              <div>Pro</div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </SignedIn>

          <SignedOut>
            <NavLink href="/sign-in">Sign In</NavLink>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Header;
