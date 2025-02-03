import Image from "next/image";

import nextlogo from "../public/next.svg";
import supabaselogo from "../public/supabase-logo-wordmark--dark.svg";
import { IconSlash } from "@tabler/icons-react";

export default function Hero() {
  return (
    <main className="flex items-center flex-col max-w-screen-xl mx-auto">
      <div className="text-center pt-32 pb-40 space-y-20">
        <h1 className="text-6xl tracking-tight font-semibold">
          Supabase auth starter for
          <br /> busy SaaS founder
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Image
            src={supabaselogo}
            alt="Supabase logo"
            className="w-40 h-auto aspect-auto"
          />
          <IconSlash className="text-neutral-700" stroke={1} size={30} />
          <Image
            src={nextlogo}
            alt="Next logo"
            className="invert w-[6.5rem] h-auto aspect-auto"
          />
        </div>
      </div>
      <div className="w-full p-px bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950" />
    </main>
  );
}
