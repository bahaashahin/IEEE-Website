import { useState } from "react";
import { Section, CardLogo } from "../components";
import { useCommitteesQuery } from "../hooks";
import { BoardMemberType } from "../types";

const COMMITTEE_TITLES = {
  operation:
    "The Backbone of Strategic Execution, Empowering Every Initiative and Driving Long-Term Success.",
  branding:
    "Our events foster creativity and teamwork, pushing the boundaries of technology.",
  technical: "Your First Step into the World of Technical.",
};

const Committees = () => {
  const [activeTab, setActiveTab] =
    useState<Exclude<BoardMemberType, "officer">>("technical");
  const { data: committees, isLoading, error } = useCommitteesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Section Header */}
      <Section
        text="Empowering Through Action"
        additionalText="Committees working together to achieve our goals."
      />

      <div className="container mx-auto px-4 sm:px-10 mb-6">
        {/* Tabs Control Wrapper */}
        <div className="px-10 pt-3 2xl:pt-16">
          <div className="flex flex-col sm:flex-row mx-auto items-center gap-2 sm:gap-4 bg-[#acabab30] p-1 rounded-2xl sm:rounded-full w-full sm:w-fit mb-4">
            {committees &&
              Object.keys(committees).map((section) => (
                <button
                  key={section}
                  onClick={() =>
                    setActiveTab(
                      section as Exclude<BoardMemberType, "officer">,
                    )
                  }
                  className={`px-4 py-1 text-white ${
                    activeTab === section ? "bg-[#05568D]" : "bg-gray-400"
                  } rounded-full w-full sm:w-auto mb-2 sm:mb-0`}
                >
                  {section} Section
                </button>
              ))}
          </div>
        </div>

        {/* Title & Description Section */}
        <h2 className="flex flex-col lg:flex-row items-start lg:items-center text-xl sm:text-2xl font-bold gap-3 lg:gap-4 leading-relaxed">
          <span className="bg-red-600 text-white px-3 py-1.5 rounded-tr-full rounded-br-full text-sm sm:text-base whitespace-nowrap shadow-sm capitalize">
            {`${activeTab as string} Committee`}
          </span>
          <span className="text-[#1A1A1A] text-base sm:text-lg font-medium">
            {COMMITTEE_TITLES[activeTab as keyof typeof COMMITTEE_TITLES]}
          </span>
        </h2>
      </div>

      {/* Cards Grid Grid */}
      <div className="container mx-auto px-4 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12">
        {committees &&
          committees[activeTab as string].map((card) => (
            <CardLogo
              key={card._id}
              imageSrc={card.logo.asset.url}
              title={card.name}
              description={card.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Committees;
