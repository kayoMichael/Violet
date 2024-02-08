import { Status } from "@prisma/client";
import React from "react";

interface Props {
  status: Status;
}
const StatusBadge = ({ status }: Props) => {
  return (
    <div
      className={`badge ${
        status === "OPEN"
          ? "badge-primary"
          : status === "IN_PROGRESS"
          ? "badge-secondary"
          : "badge-accent"
      }`}
    >
      {status}
    </div>
  );
};

export default StatusBadge;
