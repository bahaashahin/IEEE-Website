import { Fragment, useState } from "react";

import { useBoardQuery } from "../hooks";
import { Section, CardSlider, Card, BoardYearSelector } from "../components";
import { selectMemberPosition } from "../utils/member.position";
import { BoardMember, BoardMemberType } from "../types";

const sectionsToRender: { title: string; key: BoardMemberType }[] = [
  { title: "Our Officers", key: "officer" },
  { title: "Technical Board", key: "technical" },
  { title: "Branding Board", key: "branding" },
  { title: "Operation Board", key: "operation" },
];

const Board = () => {
  // Default to current year; the selector will auto-confirm or override this.
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString(),
  );

  const { data, isLoading, error } = useBoardQuery({
    year: selectedYear,
    memberType: "officer,technical,operation,branding",
  });

  const boardData: Record<BoardMemberType, BoardMember[]> = {
    officer: data?.officer ?? [],
    technical: data?.technical ?? [],
    branding: data?.branding ?? [],
    operation: data?.operation ?? [],
  };

  const renderBoardSection = (title: string, data: BoardMember[]) => {
    if (!data || data.length === 0) return null;
    return (
      <Fragment key={title}>
        <div className="py-1 mt-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-bold gap-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded-tr-2xl rounded-br-2xl">
              {title}
            </span>
            <span className="text-[#000000]">
              The Heart of IEEE Al-Azhar SB: Talented Individuals, Shared Goals
            </span>
          </h2>
        </div>
        <CardSlider
          cards={data.map((member) => {
            let position = selectMemberPosition(
              member,
              boardData?.officer[0]?.gender,
            );
            return (
              <Card
                key={member.id}
                name={member.name}
                // subtitle={position} TODO: we may need these two, not only one text and most of the times wouldn't need facebook and instagram
                // text={member.bio}
                text={position}
                imageSrc={member.image_url}
                linkedinLink={member.linkedin_url}
              />
            );
          })}
        />
      </Fragment>
    );
  };

  return (
    <div className="w-full overflow-hidden bg-gray-50/50 ">
      <Section
        text={`We Are IEEE\nThe Heart of Student Tech`}
        additionalText="A community of tech enthusiasts driving innovation"
      />

        <div className="container mx-auto py-6 space-y-8">
        {/* ── Year selector ─────────────────────────────────────────────────────── */}
        <div className="px-10 flex justify-end items-center gap-4">
          <BoardYearSelector
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>
        {/* ── Loading / error states ────────────────────────────────────────────── */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <p>Loading…</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-600 font-bold">{error.message}</p>
          </div>
        )}

        {/* ── Board sections ─────────────────────────────────────────────────────── */}
        {!isLoading &&
          !error &&
          sectionsToRender.map((section) =>
            renderBoardSection(section.title, boardData[section.key]),
          )}
      </div>
    </div>
  );
};

export default Board;
