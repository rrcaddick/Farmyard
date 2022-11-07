import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_CURRENT_CAPCITY } from "./queries";

const useGetCurrentCapcity = () => {
  const today = new Date().toLocaleDateString();
  const { data, loading, error, refetch, networkStatus } = useQuery(GET_CURRENT_CAPCITY, {
    variables: { date: today },
    notifyOnNetworkStatusChange: true,
  });
  return { currentCapcity: data, loading: loading || networkStatus === NetworkStatus.refetch, error, refetch };
};

export { useGetCurrentCapcity };
