import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "../../service/board";
import { queryKeys } from "../../lib/queryKeys";

interface UseBoardQueryParams {
  year: string;
  memberType: string;
  position?: string;
  enabled?: boolean;
}

export const useBoardQuery = ({
  year,
  memberType,
  position,
  enabled = true,
}: UseBoardQueryParams) => {
  return useQuery({
    queryKey: queryKeys.board.byYearAndType(year, memberType, position),
    queryFn: () =>
      fetchBoard({ yearFrom: year, yearTo: year, memberType, position }),
    enabled: enabled && !!year,
  });
};
