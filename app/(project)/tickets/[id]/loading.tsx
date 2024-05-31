import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const loading = () => {
  return (
    <div className='py-5 px-5'>
      <Skeleton />
      <div className='flex space-x-3 mt-3'>
        <Skeleton width='5rem' />
        <Skeleton width='5rem' />
        <Skeleton width='5rem' />
        <Skeleton width='5rem' />
        <Skeleton width='5rem' />
      </div>
      <div className='card bg-base-100 shadow-xl mt-3'>
        <div className='card-body prose max-w-none prose-neutral'>
          <h2 className='card-title'>Content:</h2>
          <Skeleton count={10} />
        </div>
      </div>
    </div>
  );
};

export default loading;
