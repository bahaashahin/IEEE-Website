import { useQuery } from "@tanstack/react-query";
import { getCommittees } from "../../service/committees";
import { queryKeys } from "../../lib/queryKeys";

export const useCommitteesQuery = () => {
  return useQuery({
    queryKey: queryKeys.committees.all,
    queryFn: getCommittees,
    staleTime: 1000 * 60 * 15, // events change less often, cache longer
  });
};
