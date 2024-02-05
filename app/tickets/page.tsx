import Link from "next/link";
import React from "react";

const TicketPage = () => {
  return (
    <Link href="/tickets/new">
      <button className="btn btn-primary">Primary</button>
    </Link>
  );
};

export default TicketPage;
