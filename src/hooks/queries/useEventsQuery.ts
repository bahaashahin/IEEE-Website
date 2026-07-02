import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../service/events";
import { queryKeys } from "../../lib/queryKeys";

export const useEventsQuery = () => {
  return useQuery({
    queryKey: queryKeys.events.all,
    queryFn: getEvents,
    staleTime: 1000 * 60 * 15, // events change less often, cache longer
  });
};
