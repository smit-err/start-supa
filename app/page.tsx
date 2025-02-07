import { getCurrentSession } from "@/actions/actions";
import Hero from "@/components/hero";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await getCurrentSession();
  if (user) {
    redirect("/dashboard");
  }
  return <Hero />;
}
