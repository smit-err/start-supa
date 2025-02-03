import { getCurrentSession } from "@/actions/actions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/sign-in");
  }
  return <h1>Protected Dashboard</h1>;
}
