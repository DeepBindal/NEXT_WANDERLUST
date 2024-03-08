import Link from "next/link";
import Image from "next/image";
import { UserButton, auth } from "@clerk/nextjs";

function Nav() {
  const { userId } = auth();
  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <div className="px-4">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          src="/images/logo.svg"
          width={30}
          height={30}
          alt="Logo"
          className="object-contain"
        />
        <p className="logo_text orange_gradient">Wanderlust</p>
      </Link>
      </div>
      {/* Desktop Navigation  */}
      <div className="sm:flex hidden px-4">
        {userId ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-listing" className="red_btn">
              Airbnb your Home!
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <>
            <div className="flex gap-3 md:gap-5 px-4">
              <Link rel="stylesheet" href="/sign-up">
                <button className="black_btn">Sign Up</button>
              </Link>
              <Link rel="stylesheet" href="/sign-in">
                <button className="black_btn">Sign In</button>
              </Link>
            </div>
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {userId ? (
          <div className="flex px-4">
            <Link href="/create-listing" className="red_btn mr-12">
              Airbnb your Home!
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <>
            {
              <div className="px-4">
              <Link href="/sign-in">
                <button type="button" className="black_btn">
                  Sign In
                </button>
              </Link>
              </div>
            }
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
