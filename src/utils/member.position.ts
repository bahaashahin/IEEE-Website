// TODO: we should write down the type of the member here instead of relying on the type any or this hard coded object
export const selectMemberPosition = (
  member: { position: string; memberType: string; track: string },
  chairGender: "male" | "female",
) => {
  let position: string;
  if (member.position === "chair") {
    position = chairGender === "female" ? "chair lady" : "chair man";
  } else if (["vice branding", "vice technical"].includes(member.position)) {
    position =
      chairGender === "female"
        ? `vice chair lady ${member.position.split(" ")[1]}`
        : `vice chair man ${member.position.split(" ")[1]}`;
  } else if (member.memberType === "officer") {
    position = member.position;
  } else {
    position = `${member.position} of ${member.track.includes("pr&fr") || member.track.includes("hr") ? member.track.toUpperCase() : member.track}`;
  }
  return position;
};
