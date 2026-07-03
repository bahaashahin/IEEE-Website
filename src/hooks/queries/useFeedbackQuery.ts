import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../../service/feedback";
import { queryKeys } from "../../lib/queryKeys";

export const useFeedbackQuery = () => {
  return useQuery({
    queryKey: queryKeys.feedback.all,
    queryFn: () => getFeedbacks(),
  });
};
