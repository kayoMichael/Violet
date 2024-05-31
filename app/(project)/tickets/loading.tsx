import React from 'react';

import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const LoadingTicketsPage = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
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
    </>
  );
};

export default LoadingTicketsPage;
