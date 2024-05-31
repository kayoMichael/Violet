'use client';
import { useState } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  id: number;
  type?: 'button' | 'dropdown';
}
const DeleteTicket = ({ id, type }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const date = new Date();
  return (
    <>
      {type ? (
        <DropdownMenuItem
          onClick={(e) => {
            (
              document.getElementById('my_modal_3') as HTMLDialogElement
            )?.showModal();
            e.preventDefault();
          }}
        >
          <p className='text-red-400'>Delete</p>
        </DropdownMenuItem>
      ) : (
        <Button
          className='btn bg-red-500 h-5'
          onClick={() => {
            (
              document.getElementById('my_modal_3') as HTMLDialogElement
            )?.showModal();
          }}
        >
          Delete Ticket <Cross2Icon />
        </Button>
      )}
      <dialog className='modal' id='my_modal_3'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <Image
            alt='delete'
            className='mx-auto'
            height={300}
            src='/delete.svg'
            width={300}
          ></Image>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='font-bold text-lg mt-5'>Confirm Deletion</h3>
            <p className='pb-4 text-red-500'>This change will be permanent</p>
            <div className='flex gap-11'>
              <Button
                onClick={async () => {
                  try {
                    setLoading(true);
                    await fetch(`/api/tickets/${id}`, {
                      method: 'DELETE',
                      cache: 'no-store',
                    }).then((res) => {
                      if (!res.ok) throw new Error();
                    });
                    setLoading(false);
                    router.push('/tickets');
                    router.refresh();
                    toast({
                      title: `Successfully Deleted Ticket # ${id}`,
                      description: date.toDateString(),
                    });
                  } catch {
                    router.refresh();
                    toast({
                      variant: 'destructive',
                      title: `Sorry Something Went Wrong Deleting Ticket # ${id}`,
                      description: date.toDateString(),
                    });
                    setLoading(false);
                    (
                      document.getElementById('my_modal_3') as HTMLDialogElement
                    )?.close();
                  }
                }}
                variant='destructive'
              >
                Delete{' '}
                {loading && (
                  <span className='loading loading-spinner loading-sm'></span>
                )}
              </Button>
              <Button
                onClick={() => {
                  (
                    document.getElementById('my_modal_3') as HTMLDialogElement
                  )?.close();
                }}
                variant='outline'
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
