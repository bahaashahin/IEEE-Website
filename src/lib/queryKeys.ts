export const queryKeys = {
  board: {
    all: ["board"] as const,
    byYear: (year: string) => ["board", year] as const,
    byYearAndType: (year: string, memberType: string, position?: string) =>
      ["board", year, memberType, position] as const,
  },
  events: {
    all: ["events"] as const,
    byId: (id: string) => ["events", id] as const,
  },
  committees: {
    all: ["committees"] as const,
  },
  boardYears: {
    all: ["boardYears"] as const,
  },
};
