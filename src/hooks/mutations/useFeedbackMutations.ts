import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedbackStatus, deleteFeedback } from "../../service/feedback";
import { queryKeys } from "../../lib/queryKeys";

interface FeedbackItem {
  id: string;
  status: string;
  [key: string]: any;
}

export const useUpdateFeedbackStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFeedbackStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feedback.all });
      const previousFeedbacks = queryClient.getQueryData<FeedbackItem[]>(
        queryKeys.feedback.all
      );

      if (previousFeedbacks) {
        queryClient.setQueryData<FeedbackItem[]>(
          queryKeys.feedback.all,
          (old) =>
            old?.map((fb) => (fb.id === id ? { ...fb, status } : fb)) ?? []
        );
      }
      return { previousFeedbacks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFeedbacks) {
        queryClient.setQueryData(
          queryKeys.feedback.all,
          context.previousFeedbacks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback.all });
    },
  });
};

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.feedback.all });
      const previousFeedbacks = queryClient.getQueryData<FeedbackItem[]>(
        queryKeys.feedback.all
      );

      if (previousFeedbacks) {
        queryClient.setQueryData<FeedbackItem[]>(
          queryKeys.feedback.all,
          (old) => old?.filter((fb) => fb.id !== id) ?? []
        );
      }
      return { previousFeedbacks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFeedbacks) {
        queryClient.setQueryData(
          queryKeys.feedback.all,
          context.previousFeedbacks
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.feedback.all });
    },
  });
};
