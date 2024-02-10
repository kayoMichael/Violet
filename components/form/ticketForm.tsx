"use client";
import { ticketSchema } from "@/components/validations/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Ticket } from "@/components/validations/schema";
import { Ticket as TicketType } from "@prisma/client";

interface Props {
  ticket?: TicketType;
}

const TicketForm = ({ ticket }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Ticket>({
    resolver: zodResolver(ticketSchema),
  });
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await fetch("/api/tickets", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }).then((res) => {
              if (!res.ok) throw new Error();
              return res.json();
            });
            router.push("/tickets");
          } catch (e) {
            setIsSubmitting(false);
            setError(true);
          }
        })}
        className="mt-10 ml-10"
      >
        <div className="form-control max-w-xl">
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
            className={`input input-bordered ${
              errors?.title ? "input-error" : "mb-4"
            }`}
            defaultValue={ticket?.title}
            {...register("title")}
          />
          <span className="text-red-400">{errors?.title?.message}</span>
          <textarea
            className="textarea textarea-bordered resize-y h-40"
            placeholder="Description"
            defaultValue={ticket?.description}
            {...register("description")}
          ></textarea>
          <p className="text-red-400 mb-5">{errors?.description?.message}</p>

          <input
            type="text"
            placeholder="Label"
            className={`input input-bordered ${
              errors?.label ? "input-error" : "mb-4"
            }`}
            defaultValue={ticket?.label}
            {...register("label")}
          />
          <p className="text-red-400 mb-5">{errors?.label?.message}</p>
          <input
            type="text"
            placeholder="priority"
            defaultValue={ticket?.priority}
            className={`input input-bordered ${
              errors?.label ? "input-error" : "mb-4"
            }`}
            {...register("priority")}
          />
          <input
            type="text"
            placeholder="status"
            defaultValue={ticket?.status}
            className={`input input-bordered ${
              errors?.label ? "input-error" : "mb-4"
            }`}
            {...register("status")}
          />
        </div>
        <button className="btn btn-primary mt-5" disabled={isSubmitting}>
          Submit
          {isSubmitting && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
        </button>
      </form>
    </>
  );
};

export default TicketForm;
