import { useQuery } from "@tanstack/react-query";
import { fetchBoardMeta } from "../../service/board";
import { queryKeys } from "../../lib/queryKeys";

export const useBoardMetaQuery = () => {
  return useQuery({
    queryKey: queryKeys.boardMeta.all,
    queryFn: fetchBoardMeta,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
