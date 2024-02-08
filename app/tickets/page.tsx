import React from "react";
import prisma from "@/prisma/client";
import StatusBadge from "@/components/badge/statusBadge";
import TicketButton from "./ticketButton";

const TicketPage = async () => {
  const tickets = await prisma.ticket.findMany();
  return (
    <div>
      <TicketButton />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Status</th>
              <th className="hidden md:table-cell">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>
                  <StatusBadge status={ticket.status} />
                </td>
                <td className="hidden md:table-cell">
                  {ticket.updatedTime.toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketPage;
