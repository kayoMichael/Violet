import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
        <div>
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
          <div className="card bg-base-100 shadow-xl mt-3">
            <div className="card-body prose max-w-none prose-neutral">
              <h2 className="card-title">Content:</h2>
              <ReactMarkDown className="">{ticket.description}</ReactMarkDown>
            </div>
          </div>
        </div>
        <div>
          <Link href={`/tickets/${ticket.id}/edit`}>
            <Button>
              Edit Ticket <Pencil1Icon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;
