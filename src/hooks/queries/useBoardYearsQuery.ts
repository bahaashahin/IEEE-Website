import { useQuery } from "@tanstack/react-query";
import { fetchBoardYears } from "../../service/board";
import { queryKeys } from "../../lib/queryKeys";

export const useBoardYearsQuery = () => {
  return useQuery({
    queryKey: queryKeys.boardYears.all,
    queryFn: fetchBoardYears,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
