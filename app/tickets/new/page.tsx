"use client";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewTicketPage = () => {
  return (
    <>
      <div className="mt-10 ml-10">
        <div className="form-control">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered max-w-xl mb-5"
          />
          <SimpleMdeEditor
            className="max-w-xl"
            placeholder="Description"
          ></SimpleMdeEditor>
        </div>
        <button className="btn btn-primary mt-5 w-1/6">Submit</button>
      </div>
    </>
  );
};

export default NewTicketPage;
