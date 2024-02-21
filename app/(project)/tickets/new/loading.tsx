import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingNewTicketPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Skeleton count={12} width="20rem"></Skeleton>
    </div>
  );
};

export default LoadingNewTicketPage;
