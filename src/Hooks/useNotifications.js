import { useQuery } from "react-query";
import { getAllNotifications } from "../services/notifications";

export const useGetNotifications = () => {
  const { data, error, isError, isPending, isSuccess, isFetching } = useQuery({
    queryKey: "notifications",
    queryFn: getAllNotifications,
  });

  return { data, error, isError, isLoading: isPending, isSuccess, isFetching };
};
