import { useMemo, useState } from "react";
import { useBoardQuery } from "../../../hooks/queries/useBoardQuery";
import { useBoardYearsQuery } from "../../../hooks/queries/useBoardYearsQuery";
import {
	useCreateBoardMember,
	useUpdateBoardMember,
	useDeleteBoardMember,
} from "../../../hooks/mutations/useBoardMutations";

export type BoardMemberType =
	| "officer"
	| "branding"
	| "technical"
	| "operation";
export type MemberFilter = "All" | BoardMemberType;

export interface BoardMember {
	_id?: string;
	id?: string;
	name: string;
	bio?: string;
	position?: string;
	memberType?: BoardMemberType;
	track?: string;
	gender?: "male" | "female";
	linkedin_url?: string;
	boardYear?: number;
	image_url?: string;
}

export interface CurrentMemberFormState {
	id?: string;
	name: string;
	bio: string;
	position: string;
	memberType: BoardMemberType;
	track: string;
	gender: "male" | "female";
	linkedin_url: string;
	boardYear: number;
}

export const useBoardMembers = () => {
	const [typeFilter, setTypeFilter] = useState<MemberFilter>("All");
	const [yearFilter, setYearFilter] = useState<string>("All");

	const { data: boardYears } = useBoardYearsQuery();

	const yearFrom =
		yearFilter === "All"
			? (boardYears?.[0] ?? new Date().getFullYear().toString())
			: yearFilter;
	const yearTo = yearFilter === "All" ? boardYears?.at(-1) : undefined;

	const yearFromStr = String(yearFrom);
	const yearToStr = yearTo == null ? undefined : String(yearTo);

	const {
		data: boardData,
		isLoading,
		isError,
		error,
		refetch,
	} = useBoardQuery({
		year: yearFromStr,
		yearTo: yearToStr,
		memberType:
			typeFilter === "All"
				? ["officer", "technical", "branding", "operation"]
        : [typeFilter],
		enabled: !!yearFromStr,
	});

	const members = useMemo(() => {
		if (!boardData) return [] as BoardMember[];
		if (Array.isArray(boardData)) return boardData as BoardMember[];
		return Object.values(boardData).flat() as BoardMember[];
	}, [boardData]);

	const totalCount = members.length;
	const officerCount = members.filter(
		(member) => member.memberType === "officer",
	).length;
	const currentYear = Number(
		boardYears?.[boardYears.length - 1] ?? new Date().getFullYear(),
	);
	const currentYearCount = members.filter(
		(member) => member.boardYear === currentYear,
	).length;

	const { mutate: createMember, isPending: isCreating } =
		useCreateBoardMember();
	const { mutate: updateMember, isPending: isUpdating } =
		useUpdateBoardMember();
	const { mutate: deleteMember, isPending: isDeleting } =
		useDeleteBoardMember();

	return {
		boardYears: boardYears ?? [],
		typeFilter,
		setTypeFilter,
		yearFilter,
		setYearFilter,
		members,
		totalCount,
		officerCount,
		currentYear,
		currentYearCount,
		isLoading,
		isError,
		error,
		refetch,
		createMember,
		updateMember,
		deleteMember,
		isCreating,
		isUpdating,
		isDeleting,
	};
};
