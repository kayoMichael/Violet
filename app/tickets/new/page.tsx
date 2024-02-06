"use client";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface ticket {
  title: string;
  description: string;
}

const NewTicketPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<ticket>();
  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          await fetch("/api/tickets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          router.push("/tickets");
        })}
        className="mt-10 ml-10"
      >
        <div className="form-control">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered max-w-xl mb-5"
            {...register("title")}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMdeEditor
                className="max-w-xl"
                placeholder="Description"
                {...field}
              ></SimpleMdeEditor>
            )}
          ></Controller>
        </div>
        <button className="btn btn-primary mt-5 w-1/6">Submit</button>
      </form>
    </>
  );
};

export default NewTicketPage;
