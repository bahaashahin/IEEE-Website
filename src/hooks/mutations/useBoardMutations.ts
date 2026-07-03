import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBoardMember,
  updateBoardMember,
  deleteBoardMember,
} from "../../service/board";
import { queryKeys } from "../../lib/queryKeys";

export const useCreateBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoardMember,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      const previous = queryClient.getQueriesData({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      return { previous };
    },
    onError: (_, __, context) => {
      context?.previous?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as unknown[], data);
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.boardYears.all });
    },
  });
};

export const useUpdateBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBoardMember,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      const previous = queryClient.getQueriesData({
        queryKey: queryKeys.board.all,
        exact: false,
      });

      // Optimistic patch: merge formData entries onto the existing cached item(s)
      try {
        const { id, formData } = variables as any;
        const optimisticValues: Record<string, any> = {};
        if (formData && typeof formData.forEach === "function") {
          formData.forEach((v: any, k: string) => {
            optimisticValues[k] = v;
          });
        }

        const queries = queryClient.getQueriesData({
          queryKey: queryKeys.board.all,
          exact: false,
        });
        queries.forEach(([qKey, cached]) => {
          if (!cached) return;
          if (Array.isArray(cached)) {
            queryClient.setQueryData(qKey as unknown[], (old: any[]) => {
              if (!old) return old;
              return old.map((item) =>
                item.id === id || item._id === id
                  ? { ...item, ...optimisticValues }
                  : item,
              );
            });
          } else if (typeof cached === "object") {
            queryClient.setQueryData(qKey as unknown[], (old: any) => {
              if (!old) return old;
              const copy: Record<string, any> = {
                ...(old as Record<string, any>),
              };
              Object.keys(copy).forEach((k) => {
                if (Array.isArray(copy[k])) {
                  copy[k] = copy[k].map((item: any) =>
                    item.id === id || item._id === id
                      ? { ...item, ...optimisticValues }
                      : item,
                  );
                }
              });
              return copy;
            });
          }
        });
      } catch (err) {
        console.error(
          "[board-mutation][update][onMutate] optimistic patch error",
          err,
        );
      }

      return { previous };
    },

    onError: (_, __, context) => {
      context?.previous?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as unknown[], data);
      });
    },
    onSuccess: async (data) => {
      // Patch all existing board cache entries with the updated member so UI updates immediately.
      try {
        const updatedMember = data?.data ?? data;
        if (updatedMember?.id) {
          const queries = queryClient.getQueriesData({
            queryKey: queryKeys.board.all,
            exact: false,
          });
          const patchedKeys: unknown[] = [];
          queries.forEach(([qKey, cached]) => {
            let newCached = cached;
            let replacedCount = 0;
            if (Array.isArray(cached)) {
              newCached = (cached as any[]).map((item) => {
                if (
                  item.id === updatedMember.id ||
                  item._id === updatedMember.id
                ) {
                  replacedCount++;
                  return { ...item, ...updatedMember };
                }
                return item;
              });
            } else if (cached && typeof cached === "object") {
              newCached = { ...(cached as Record<string, any>) };
              Object.keys(newCached).forEach((k) => {
                if (Array.isArray(newCached[k])) {
                  newCached[k] = (newCached[k] as any[]).map((item) => {
                    if (
                      item.id === updatedMember.id ||
                      item._id === updatedMember.id
                    ) {
                      replacedCount++;
                      return { ...item, ...updatedMember };
                    }
                    return item;
                  });
                }
              });
            }
            if (replacedCount > 0) {
              console.log(
                "[board-mutation][update][onSuccess] patched",
                replacedCount,
                "items in cache for key=",
                qKey,
              );
              patchedKeys.push(qKey);
            }
            queryClient.setQueryData(qKey as unknown[], newCached);
          });
          // Immediately refetch the specific queries we patched to ensure fresh authoritative data
          for (const k of patchedKeys) {
            try {
              await queryClient.refetchQueries({
                queryKey: k as any[],
                exact: true,
              });
            } catch (refErr) {
              console.error(
                "[board-mutation][update][onSuccess] refetch error for key=",
                k,
                refErr,
              );
            }
          }
        }
      } catch (err) {
        console.error(
          "[board-mutation][update][onSuccess] patch cache error",
          err,
        );
      }
      // Invalidate to trigger fresh refetches for any remaining entries
      queryClient.invalidateQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      // If an update changes the member's boardYear, ensure years list is refreshed
      queryClient.invalidateQueries({ queryKey: queryKeys.boardYears.all });
    },
    onSettled: () => {},
  });
};

export const useDeleteBoardMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardMember,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      const previous = queryClient.getQueriesData({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      return { previous };
    },
    onError: (_, __, context) => {
      context?.previous?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as unknown[], data);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.boardYears.all });
    },
  });
};
