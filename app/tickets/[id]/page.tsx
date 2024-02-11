import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import { Pencil2Icon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import DeleteTicket from "./delete";
import AssignTicket from "./assign";

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
      <div className="flex space-x-2">
        <h1 className="font-extrabold text-2xl mb-5">
          Ticket #{ticket.id} Details
        </h1>
        <Link href={`/tickets/${ticket.id}/edit`}>
          <Button className="bg-purple-500 h-12 ml-5">
            Edit Ticket <Pencil2Icon />
          </Button>
        </Link>
        <DeleteTicket id={ticket.id} />
        <AssignTicket></AssignTicket>
      </div>
      <h1 className="font-extrabold text-xl mb-10 mt-10">{ticket.title}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ticket.label}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.date.toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="card bg-base-100 shadow-xl mt-3">
          <div className="card-body prose max-w-none prose-neutral">
            <ReactMarkDown>{ticket.description}</ReactMarkDown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
