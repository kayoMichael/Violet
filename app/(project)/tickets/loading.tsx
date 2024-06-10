import React from 'react';

import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const LoadingTicketsPage = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div>
        <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                <Skeleton width={10} />
              </h2>
              <p className='text-muted-foreground'>
                Here&apos;s a list of your Registered Tickets!
              </p>
            </div>
            <div className='flex items-center space-x-2'></div>
          </div>
          <div>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Status</th>
                    <th className='hidden md:table-cell'>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {skeletons.map((ticket) => (
                    <tr key={ticket}>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td className='hidden md:table-cell'>
                        <Skeleton />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingTicketsPage;
