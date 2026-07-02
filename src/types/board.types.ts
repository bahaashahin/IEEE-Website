export interface BoardMember {
  id: string;
  name: string;
  bio: string;
  position: string;
  memberType: BoardMemberType;
  track: string;
  gender: "male" | "female";
  image_url: string;
  linkedin_url: string;
}

export type BoardMemberType =
  "officer" | "branding" | "technical" | "operation";
