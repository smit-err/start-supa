import Link from "next/link";

import PlaceholderLogo from "./placeholder-logo";
import { Button } from "./ui/button";

import { getCurrentSession, signout } from "@/actions/actions";

export default async function Navbar() {
  const { user } = await getCurrentSession();

  return (
    <header className="py-4 border-b">
      <nav className="flex justify-between md:max-w-screen-md xl:max-w-screen-xl lg:max-w-screen-lg mx-auto">
        <Link
          href={"/"}
          className="flex text-3xl items-center gap-3 rounded-lg group"
        >
          <PlaceholderLogo className="fill-white w-8 h-auto aspect-auto transition-colors group-hover:fill-neutral-300" />
          <span className="transition-colors group-hover:text-neutral-300">
            Rine
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button asChild variant={"outline"}>
                <Link href={"/sign-in"}>Sign in</Link>
              </Button>
              <Button asChild>
                <Link href={"/sign-up"}>Sign up</Link>
              </Button>
            </>
          ) : (
            <form>
              <Button
                formAction={async () => {
                  "use server";
                  await signout();
                }}
              >
                Sign out
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
