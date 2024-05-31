import type { Ticket } from '@prisma/client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Props {
  tickets: Ticket[];
  image?: string | null | undefined;
}
export function RecentTickets({ tickets, image }: Props) {
  return (
    <div className='space-y-8'>
      {tickets.map((ticket, index) => (
        <div className='flex items-center' key={index}>
          <Avatar className='h-9 w-9'>
            <AvatarImage alt='Avatar' src={image === null ? '' : image} />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{ticket.title}</p>
            <p className='text-sm text-pink-400'>
              {ticket.date.toDateString()}
            </p>
          </div>
          <div className='ml-auto font-medium'>
            <Badge>{ticket.label}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
