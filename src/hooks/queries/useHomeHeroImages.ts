import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "../../service/homeHeroSecion";
import { queryKeys } from "../../lib/queryKeys";

export const useHomeHeroImages = () => {
	return useQuery({
		queryKey: queryKeys.home.all,
		queryFn: () => getHomePageData(),
	});
};
