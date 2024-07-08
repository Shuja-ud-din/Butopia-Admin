import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllNotifications,
  readAllNotifications,
} from "../services/notifications";

export const useGetNotifications = () => {
  const { data, error, isError, isPending, isSuccess, isFetching } = useQuery({
    queryKey: "notifications",
    queryFn: getAllNotifications,
  });

  return { data, error, isError, isLoading: isPending, isSuccess, isFetching };
};

export const useReadAllNotifications = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    console.log("Successfully read all notifications");
    queryClient.invalidateQueries("notifications");
  };

  const onError = (error) => {
    console.error("Error reading notifications", error);
  };

  const { mutateAsync, isLoading, isError, isSuccess } = useMutation({
    mutationFn: readAllNotifications,
    onSuccess,
    onError,
  });

  return { readAllNotifications: mutateAsync, isLoading, isError, isSuccess };
};
