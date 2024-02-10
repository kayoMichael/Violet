"use client";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  id: number;
}
const DeleteTicket = ({ id }: Props) => {
  const router = useRouter();
  return (
    <>
      <Button
        className="btn bg-red-500 h-5"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Delete Ticket <Cross2Icon />
      </Button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Image
            src="/delete.svg"
            alt="delete"
            width={300}
            height={300}
            className="mx-auto"
          ></Image>
          <div className="flex flex-col items-center justify-center">
            <h3 className="font-bold text-lg mt-5">Confirm Deletion</h3>
            <p className="pb-4 text-red-500">This change will be permanent</p>
            <div className="flex gap-11">
              <Button
                variant="destructive"
                onClick={async () => {
                  try {
                    await fetch(`/api/tickets/${id}`, {
                      method: "DELETE",
                      cache: "no-store",
                    }).then((res) => {
                      if (!res.ok) throw new Error();
                      return res.json();
                    });
                    router.push("/tickets");
                    router.refresh();
                  } catch (error) {
                    console.error("Error:", error);
                    router.refresh();
                  }
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  (
                    document.getElementById("my_modal_3") as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteTicket;
