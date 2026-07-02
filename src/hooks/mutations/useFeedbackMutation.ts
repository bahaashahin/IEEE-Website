import { useMutation } from "@tanstack/react-query";
import { submitFeedback, type FeedbackPayload } from "../../service/feedback";

export const useFeedbackMutation = () => {
  return useMutation({
    mutationFn: (payload: FeedbackPayload) => submitFeedback(payload),
  });
};
