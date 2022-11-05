import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_CURRENT_CAPCITY } from "./queries";

const useGetCurrentCapcity = () => {
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_CURRENT_CAPCITY, {
    notifyOnNetworkStatusChange: true,
  });
  return { currentCapcity: data, loading: loading || networkStatus === NetworkStatus.refetch, error, refetch };
};

export { useGetCurrentCapcity };
