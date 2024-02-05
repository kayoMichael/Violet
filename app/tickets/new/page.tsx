import React from "react";

const NewTicketPage = () => {
  return (
    <>
      <div className="mt-10 ml-10">
        <div className="form-control">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered max-w-lg mb-5"
          />
          <textarea
            className="textarea textarea-bordered max-w-lg"
            placeholder="Description"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-5">Submit</button>
      </div>
    </>
  );
};

export default NewTicketPage;
