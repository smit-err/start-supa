import Link from "next/link";

import { IconHome } from "@tabler/icons-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="py-4 border-b">
      <nav className="flex justify-between max-w-screen-xl mx-auto">
        <Link
          href={"/"}
          className="flex text-sm items-center gap-2 p-2 transition-colors rounded-lg hover:bg-neutral-800"
        >
          <IconHome size={20} />
          Home
        </Link>
        <HeaderAuth />
      </nav>
    </header>
  );
}

function HeaderAuth() {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button asChild variant={"outline"}>
          <Link href={"/sign-in"}>Sign in</Link>
        </Button>
        <Button asChild>
          <Link href={"/sign-up"}>Sign up</Link>
        </Button>
      </div>
    </>
  );
}
