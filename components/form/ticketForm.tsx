"use client";
import { ticketSchema } from "@/components/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { statuses } from "../table/data/labels";
import { labels } from "../table/data/labels";
import { priorities } from "../table/data/labels";
import { Ticket } from "@/components/validations/schema";
import { Ticket as TicketType } from "@prisma/client";

interface Props {
  ticket?: TicketType;
}

const TicketForm = ({ ticket }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
  });
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            if (ticket) {
              await fetch(`/api/tickets/${ticket.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                cache: "no-store",
                body: JSON.stringify(data),
              }).then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
              });
              router.push(`/tickets/${ticket.id}`);
              router.refresh();
              return;
            }
            await fetch("/api/tickets", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              cache: "no-store",
              body: JSON.stringify(data),
            }).then((res) => {
              if (!res.ok) throw new Error();
              return res.json();
            });
            router.push("/tickets");
            router.refresh();
          } catch (e) {
            setIsSubmitting(false);
            setError(true);
          }
        })}
        className="mt-10 ml-10"
      >
        <div className="form-control max-w-xl w-[500px]">
          {error && (
            <div role="alert" className="alert alert-error mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                onClick={() => setError(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error Creating Ticket, Please Check your Inputs Again</span>
            </div>
          )}
          <input
            type="text"
            placeholder="Title"
            className={`input input-bordered  w-full ${
              errors?.title ? "input-error" : "mb-4"
            }`}
            defaultValue={ticket?.title}
            {...register("title")}
          />
          <span className="text-red-400">{errors?.title?.message}</span>
          <div className="flex gap-3 justify-center">
            <select
              className="select w-full max-w-xs bg-secondary"
              defaultValue={ticket ? `${ticket.status}` : "default"}
              {...register("status")}
            >
              <option disabled value="default">
                Status
              </option>
              {statuses.map((status) => (
                <option key={status.label} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <select
              className="select w-full max-w-xs bg-primary"
              defaultValue={ticket ? `${ticket.label}` : "default"}
              {...register("label")}
            >
              <option disabled value="default">
                Label
              </option>
              {labels.map((label) => (
                <option key={label.label} value={label.value}>
                  {label.label}
                </option>
              ))}
            </select>
            <select
              className="select w-full max-w-xs bg-purple-400"
              defaultValue={ticket ? `${ticket.priority}` : "default"}
              {...register("priority")}
            >
              <option disabled value="default">
                Priority
              </option>
              {priorities.map((priority) => (
                <option key={priority.label} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered resize-y h-40 w-full mt-10"
          placeholder="Description"
          defaultValue={ticket?.description}
          {...register("description")}
        ></textarea>
        <p className="text-red-400 mb-5">{errors?.description?.message}</p>
        <button className="btn btn-primary mt-5 ml-48" disabled={isSubmitting}>
          {ticket ? "Update" : "Create"} Ticket{" "}
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
