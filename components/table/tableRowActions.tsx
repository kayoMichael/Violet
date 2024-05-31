'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import type { Row } from '@tanstack/react-table';

import DeleteTicket from '@/app/(project)/tickets/[id]/delete';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const DataTableRowActions = <TData,>({
  row,
}: DataTableRowActionsProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          variant='ghost'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem asChild>
          <Link href={`/tickets/${row.getValue('id')}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Copy Details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteTicket id={row.getValue('id')} type='dropdown'></DeleteTicket>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableRowActions;
