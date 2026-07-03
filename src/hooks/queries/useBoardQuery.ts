import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "../../service/board";
import { queryKeys } from "../../lib/queryKeys";

interface UseBoardQueryParams {
  year: string;
  yearTo?: string;
  memberType: string | string[];
  position?: string;
  track?: string;
  enabled?: boolean;
}

export const useBoardQuery = ({
  year,
  yearTo = year,
  memberType,
  position,
  track,
  enabled = true,
}: UseBoardQueryParams) => {
  const yf = `${year}`;
  const yt = yearTo == null ? undefined : String(yearTo);
  return useQuery({
    queryKey: queryKeys.board.byYearAndType(yf, yt, memberType, position),
    queryFn: () =>
      fetchBoard({
        yearFrom: yf,
        yearTo: yt,
        memberType: Array.isArray(memberType)
          ? memberType.join(",")
          : String(memberType),
        position,
        track,
      }),
    enabled: enabled && !!yf,
  });
};
