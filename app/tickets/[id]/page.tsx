import React from "react";
import prisma from "@/prisma/client";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const TicketDetailPage = async ({ params: { id } }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!ticket) {
    notFound();
  }

  return (
    <div className="py-5 px-5">
      <h1 className="font-extrabold text-2xl">{ticket.title}</h1>
      <div className="flex space-x-3 mt-3">
        <Badge>{ticket.label}</Badge>
        <Badge
          className={`${
            ticket.status === "open"
              ? "bg-green-500"
              : ticket.status === "backlog"
              ? "bg-blue-500"
              : "bg-white"
          }`}
        >
          {ticket.status}
        </Badge>
        <Badge>{ticket.priority}</Badge>
        <Badge>{ticket.date.toDateString()}</Badge>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl mt-3">
        <div className="card-body">
          <h2 className="card-title">Content:</h2>
          <p>{ticket.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
