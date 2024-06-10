'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import { Loading } from 'react-daisyui';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InferName = ({ user }: { user: { id: string; name: string | null } }) => {
  const [open, setOpen] = useState(!user.name);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please Insert Your Name?</AlertDialogTitle>
          <AlertDialogDescription>
            We need your name to continue
          </AlertDialogDescription>
          <Label>Name</Label>
          <Input
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Input>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            disabled={name.trim() === ''}
            onClick={async () => {
              setLoading(true);
              await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
              });
              router.refresh();
              setLoading(false);
            }}
          >
            {loading && <Loading />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InferName;
