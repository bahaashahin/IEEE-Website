import { useParams, useNavigate } from "react-router-dom";
import { Card, CardSlider } from "../components";
import { useEventByIdQuery } from "../hooks";

const EventDetails = () => {
  const { id } = useParams();

  if (!id) {
    const navigate = useNavigate();
    navigate("/events");
    return null;
  }

  const { data: event, isLoading, error } = useEventByIdQuery(id);

  if (!event) {
    return (
      <div className="p-6 text-center">
        <h1 className="my-24 text-xl font-bold">Event Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <section
        className={`relative h-[500px] w-full bg-center bg-cover ${
          !event.coverImage?.asset.url ? "" : "bg-blue-600"
        }`}
        style={
          event.coverImage?.asset.url
            ? { backgroundImage: `url(${event.coverImage.asset.url})` }
            : {}
        }
      />

      <div className="w-fit px-4 py-6 relative top-[-45px] bg-white m-auto rounded-2xl shadow-md mx-3 sm:mx-5 md:mx-10 lg:mx-20">
        <h2 className="flex flex-col text-center gap-2">
          <span
            className={`w-fit bg-blue-600 text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg md:text-xl font-bold`}
          >
            {event.title}
          </span>
          <span className="text-[#1A1A1A] text-sm sm:text-base md:text-lg font-semibold">
            {event.subtitle}
          </span>
        </h2>
      </div>

      {event.speakers && event.speakers.length > 0 && (
        <div className="my-10 px-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-bold gap-2 mb-8">
            <span className="bg-red-600 text-white px-2 py-1 rounded-tr-2xl rounded-br-2xl">
              Our Speaker
            </span>
            <span className="text-[#1A1A1A]">
              Gain valuable knowledge from the brightest minds in tech and
              engineering.
            </span>
          </h2>{" "}
          <CardSlider
            cards={event.speakers.map((speaker, index) => (
              <Card
                key={`${index}-${speaker.title}`}
                title={speaker.title}
                name={speaker.name}
                text={""}
                imageSrc={speaker.photo?.asset.url ?? ""}
              />
            ))}
          />
        </div>
      )}
      {event.memories && event.memories.length > 0 && (
        <div className="my-10 px-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-bold gap-2 mb-8">
            <span className="bg-red-600 text-white px-2 py-1 rounded-tr-2xl rounded-br-2xl">
              Moments That Inspire
            </span>
            <span className="text-[#1A1A1A]">
              Capturing the highlights of our innovative and collaborative
              events.
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.memories.map((memory, index) => (
              <img
                key={`${index}-${memory.photo.asset?.url}`}
                src={memory.photo.asset?.url ?? ""}
                alt={`Memory ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
