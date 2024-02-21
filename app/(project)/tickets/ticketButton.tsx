import Link from "next/link";

const TicketButton = () => (
  <div>
    <Link href="/tickets/new">
      <button className="btn btn-primary p-2 w-28">New Ticket</button>
    </Link>
  </div>
);

export default TicketButton;
