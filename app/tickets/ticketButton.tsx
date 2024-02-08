import Link from "next/link";

const TicketButton = () => (
  <div className="mb-5 mt-3 ml-3">
    <Link href="/tickets/new">
      <button className="btn btn-primary p-2 w-28">New Ticket</button>
    </Link>
  </div>
);

export default TicketButton;
