import React from "react";
import prisma from "@/prisma/client";
import TicketTable from "@/components/table/ticketTable";
import { columns } from "@/components/table/columns";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/authOptions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const TicketPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  const ticket = await prisma.ticket.findMany({
    where: {
      email: session.user!.email!,
    },
  });
  return (
    <div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Welcome back {session?.user?.name?.toString()}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your Registered Tickets!
            </p>
          </div>
          <div className="flex items-center space-x-2"></div>
        </div>
        <TicketTable data={ticket} columns={columns} />
      </div>
    </div>
  );
};

export default TicketPage;
