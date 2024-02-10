import TicketForm from "@/components/form/ticketForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
const EditTicketPage = async ({ params }: Props) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!ticket) {
    notFound();
  }
  return <TicketForm ticket={ticket}></TicketForm>;
};

export default EditTicketPage;
