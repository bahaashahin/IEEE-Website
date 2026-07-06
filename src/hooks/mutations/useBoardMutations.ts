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
      console.log(
        "[useUpdateBoardMember][onMutate] Mutation started. Variables:",
        variables,
      );
      await queryClient.cancelQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      const previous = queryClient.getQueriesData({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      console.log(
        "[useUpdateBoardMember][onMutate] Captured previous cache state:",
        previous,
      );

      // Optimistic patch: merge formData entries onto the existing cached item(s)
      try {
        const { id, formData } = variables as any;
        const optimisticValues = {
          name: formData.get("name") as string,
          bio: formData.get("bio") as string,
          position: formData.get("position") as string,
          memberType: formData.get("memberType") as string,
          track: formData.get("track") as string,
          gender: formData.get("gender") as string,
          linkedin_url: formData.get("linkedin_url") as string,
          // CRITICAL: Parse the number!
          boardYear: Number(formData.get("boardYear")),
        };

        // Remove undefined/null values so they don't overwrite good data with nulls
        Object.keys(optimisticValues).forEach((key) => {
          if (
            optimisticValues[key as keyof typeof optimisticValues] === undefined
          ) {
            delete optimisticValues[key as keyof typeof optimisticValues];
          }
        });
        console.log(
          "[useUpdateBoardMember][onMutate] Extracted optimistic values:",
          optimisticValues,
        );

        const queries = queryClient.getQueriesData({
          queryKey: queryKeys.board.all,
          exact: false,
        });
        queries.forEach(([qKey, cached]) => {
          if (!cached) return;
          console.log(
            "[useUpdateBoardMember][onMutate] Optimistically patching cache key:",
            qKey,
            "current value:",
            cached,
          );
          if (Array.isArray(cached)) {
            queryClient.setQueryData(qKey as unknown[], (old: any[]) => {
              if (!old) return old;
              const next = old.map((item) =>
                item.id === id || item._id === id
                  ? { ...item, ...optimisticValues }
                  : item,
              );
              console.log(
                "[useUpdateBoardMember][onMutate] New cache value for array key:",
                qKey,
                next,
              );
              return next;
            });
            // Inside your onMutate object patch logic:
          } else if (typeof cached === "object") {
            queryClient.setQueryData(qKey as unknown[], (old: any) => {
              if (!old) return old;
              const copy: Record<string, any[]> = { ...old };

              let foundMember: any = null;
              let originalCategory = "";

              // 1. Find and extract the member
              Object.keys(copy).forEach((k) => {
                if (Array.isArray(copy[k])) {
                  const index = copy[k].findIndex(
                    (item) => item.id === id || item._id === id,
                  );
                  if (index !== -1) {
                    foundMember = { ...copy[k][index] };
                    originalCategory = k;
                    // Remove from old category
                    copy[k] = copy[k].filter(
                      (item) => item.id !== id && item._id !== id,
                    );
                  }
                }
              });

              if (foundMember) {
                // 2. Apply optimistic updates
                const updatedMember = { ...foundMember, ...optimisticValues };

                // 3. Determine the new category (fallback to original if not changing)
                const targetCategory =
                  optimisticValues.memberType || originalCategory;

                // 4. Insert into the correct array
                if (copy[targetCategory]) {
                  copy[targetCategory] = [
                    ...copy[targetCategory],
                    updatedMember,
                  ];
                } else {
                  // Fallback if the array doesn't exist for some reason
                  copy[originalCategory] = [
                    ...copy[originalCategory],
                    updatedMember,
                  ];
                }
              }

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

    onError: (err, variables, context) => {
      console.error(
        "[useUpdateBoardMember][onError] Mutation failed. Error:",
        err,
        "Variables:",
        variables,
      );
      context?.previous?.forEach(([queryKey, data]) => {
        console.log(
          "[useUpdateBoardMember][onError] Rolling back query key:",
          queryKey,
          "to:",
          data,
        );
        queryClient.setQueryData(queryKey as unknown[], data);
      });
    },
    onSuccess: async (data, variables) => {
      console.log("[useUpdateBoardMember][onSuccess] Mutation succeeded!");
      console.log(
        "[useUpdateBoardMember][onSuccess] Raw data returned from backend:",
        data,
      );
      console.log(
        "[useUpdateBoardMember][onSuccess] Variables passed to mutation:",
        variables,
      );

      try {
        const updatedMember =
          data?.data ?? data?.member ?? data?.boardMember ?? data;
        const memberId =
          variables?.id || updatedMember?.id || updatedMember?._id;
        console.log(
          "[useUpdateBoardMember][onSuccess] Resolved updatedMember object:",
          updatedMember,
        );
        console.log(
          "[useUpdateBoardMember][onSuccess] Resolved memberId:",
          memberId,
        );

        if (memberId) {
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
                if (item.id === memberId || item._id === memberId) {
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
                    if (item.id === memberId || item._id === memberId) {
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
                "new cached value:",
                newCached,
              );
              patchedKeys.push(qKey);
            }
            queryClient.setQueryData(qKey as unknown[], newCached);
          });

          // Immediately refetch the specific queries we patched to ensure fresh authoritative data
          for (const k of patchedKeys) {
            try {
              console.log(
                "[useUpdateBoardMember][onSuccess] Triggering active refetch for key:",
                k,
              );
              await queryClient.refetchQueries({
                queryKey: k as any[],
                exact: true,
              });
              console.log(
                "[useUpdateBoardMember][onSuccess] Refetch finished for key:",
                k,
              );
            } catch (refErr) {
              console.error(
                "[board-mutation][update][onSuccess] refetch error for key=",
                k,
                refErr,
              );
            }
          }
        } else {
          console.warn(
            "[useUpdateBoardMember][onSuccess] No memberId found, skipping manual cache patching.",
          );
        }
      } catch (err) {
        console.error(
          "[board-mutation][update][onSuccess] patch cache error",
          err,
        );
      }

      console.log(
        "[useUpdateBoardMember][onSuccess] Invalidating all queries starting with:",
        queryKeys.board.all,
      );
      // Invalidate to trigger fresh refetches for any remaining entries
      queryClient.invalidateQueries({
        queryKey: queryKeys.board.all,
        exact: false,
      });
      // If an update changes the member's boardYear, ensure years list is refreshed
      queryClient.invalidateQueries({ queryKey: queryKeys.boardYears.all });
    },
    onSettled: (data, error, variables) => {
      console.log(
        "[useUpdateBoardMember][onSettled] Mutation settled. Data:",
        data,
        "Error:",
        error,
        "Variables:",
        variables,
      );
    },
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
