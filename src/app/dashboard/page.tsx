import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardClient from "./dashboardClient";
import { redirect } from "next/navigation"; 

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/"); // Redireciona para a página inicial
    }

    return <DashboardClient session={session} />;
}
