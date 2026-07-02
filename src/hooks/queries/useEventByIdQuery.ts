import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import { getEventById } from "../../service/events";

export const useEventByIdQuery = (id: string) => {
  return useQuery({
    queryKey: queryKeys.events.byId(id),
    queryFn: () => getEventById(id),
  });
};
