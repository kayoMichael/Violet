'use client';
import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { statuses, priorities } from './data/labels';
import { DataTableViewOptions } from './tableDataViewOptions';
import { DataTableFacetedFilter } from './tableFacetedFilter';

import type { Table } from '@tanstack/react-table';

import TicketButton from '@/app/(project)/tickets/ticketButton';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export const DataTableToolBar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          className='h-8 w-[150px] lg:w-[250px]'
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          placeholder='Filter tasks...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            options={statuses}
            title='Status'
          />
        )}
        {table.getColumn('priority') && (
          <DataTableFacetedFilter
            column={table.getColumn('priority')}
            options={priorities}
            title='Priority'
          />
        )}
        <TicketButton />
        {isFiltered && (
          <Button
            className='h-8 px-2 lg:px-3'
            onClick={() => {
              table.resetColumnFilters();
            }}
            variant='ghost'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
};
