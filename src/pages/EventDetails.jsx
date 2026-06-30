import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import aiGame from "../assets/events-img/AI Game.jpg";
import codeBaker from "../assets/events-img/Code Baker.jpg";
import juniorCamp from "../assets/events-img/Junior Camp.jpg";
import kickStart from "../assets/events-img/KickStart.jpg";
import Semicolon from "../assets/events-img/The Semicolon Show.jpg";
import Card from "../components/Card";
import CardSlider from "../components/CardSlider";

import alassal from "../assets/Event-details/AiGame/AlAssaal.jpeg";
import AhmedHafez from "../assets/Event-details/AiGame/AhmedHafez.jpeg";
import aboAlfotoh from "../assets/Event-details/AiGame/AboAlfotoh.jpeg";
import AhmedIbrahim from "../assets/Event-details/AiGame/AhmedIbrahim.jpeg";
import AmrHelal from "../assets/Event-details/AiGame/AmrHelal.jpeg";
import mem1 from "../assets/Event-details/AiGame/mem1.jpeg";
import mem2 from "../assets/Event-details/AiGame/mem2.jpeg";
import mem3 from "../assets/Event-details/AiGame/mem3.jpeg";
import mem4 from "../assets/Event-details/AiGame/mem4.jpeg";
import mem5 from "../assets/Event-details/AiGame/mem5.jpeg";

import meeem1 from "../assets/Event-details/codeBaker/meem1.jpeg";
import meeem2 from "../assets/Event-details/codeBaker/meem2.jpeg";
import meeem3 from "../assets/Event-details/codeBaker/meem3.jpeg";

import meem1 from "../assets/Event-details/JuniorCamp/meem1.jpeg";
import meem2 from "../assets/Event-details/JuniorCamp/meem2.jpeg";
import meem3 from "../assets/Event-details/JuniorCamp/meem3.jpeg";
import meem4 from "../assets/Event-details/JuniorCamp/meem4.jpeg";
import meem5 from "../assets/Event-details/JuniorCamp/meem5.jpeg";
import meem6 from "../assets/Event-details/JuniorCamp/meem6.jpeg";
import meem7 from "../assets/Event-details/JuniorCamp/meem7.jpeg";
import meem8 from "../assets/Event-details/JuniorCamp/meem8.jpeg";
import meem9 from "../assets/Event-details/JuniorCamp/meem9.jpeg";

import mem_1 from "../assets/Event-details/kickStart/mem-1.jpeg";
import mem_2 from "../assets/Event-details/kickStart/mem-2.jpeg";
import mem_3 from "../assets/Event-details/kickStart/mem-3.jpeg";
import mem_4 from "../assets/Event-details/kickStart/mem-4.jpeg";
import mem_5 from "../assets/Event-details/kickStart/mem-5.jpeg";

import AbdallaMansour from "../assets/Event-details/TheSemicolonShow/AbdallaMansour.jpeg";
import MahmoudAlGezawy from "../assets/Event-details/TheSemicolonShow/MahmoudAlGezawy.jpeg";
import mohamedAmr from "../assets/Event-details/TheSemicolonShow/mohamedAmr.jpeg";
import MuhammadAlBahnasi from "../assets/Event-details/TheSemicolonShow/MuhammadAl-Bahnasi.jpeg";
import tarekAlAbd from "../assets/Event-details/TheSemicolonShow/tarekAlAbd.jpeg";
import memory1 from "../assets/Event-details/TheSemicolonShow/memry1.jpeg";
import memory2 from "../assets/Event-details/TheSemicolonShow/memry2.jpeg";
import memory3 from "../assets/Event-details/TheSemicolonShow/memry3.jpeg";
import memory4 from "../assets/Event-details/TheSemicolonShow/memry4.jpeg";
import memory5 from "../assets/Event-details/TheSemicolonShow/mmmmmm1.jpeg";
import memory6 from "../assets/Event-details/TheSemicolonShow/mmmmmm6.jpeg";

const EventDetails = () => {
  const { id } = useParams();

  const events = [
    {
      id: "1",
      title: "What’s Ai Game",
      description:
        "The event explores how AI drives business growth and integrates with robotics and IoT. Attendees gain practical steps to start a career in AI and discover its diverse applications. A panel with AI engineers offers an interactive platform for discussions, addressing questions and enhancing understanding of AI’s industry impact.",
      bannerColor: "bg-red-600",
      bannerImage: aiGame,
      speakers: [
        {
          title: "Mohammed Al Assal",
          name: "Mohammed Al Assal",
          imageSrc: alassal,
        },
        {
          title: "AhmedHafez",
          name: "Ahmed Hafez",
          imageSrc: AhmedHafez,
        },
        {
          title: "Ahmed Abo AlFotoh",
          name: "Ahmed Abo AlFotoh",
          imageSrc: aboAlfotoh,
        },
        {
          title: "AhmedIbrahim",
          name: "Ahmed Ibrahim",
          imageSrc: AhmedIbrahim,
        },
        {
          title: "Ali Ahmed",
          name: "Amr Helal",
          imageSrc: AmrHelal,
        },
      ],
      memories: [
        { imageSrc: mem1 },
        { imageSrc: mem2 },
        { imageSrc: mem3 },
        { imageSrc: mem4 },
        { imageSrc: mem5 },
      ],
    },
    // code baker
    {
      id: "2",
      title: "What’s Code Baker",
      description:
        "Held over 1.5 to 2 months, the camp covers multiple tracks, like Java, Data Science, Embedded Systems, Graphic Design,  HR, and etc. It provides hands-on learning experiences, helping participants build practical skills. Instructors are former trainees who have gained knowledge throughout the season, making the event a culmination of their learning journey.",
      bannerColor: "bg-red-600",
      bannerImage: codeBaker,
      // speakers: [
      //   {
      //     title: "Dr. Sarah Mohamed",
      //     imageSrc: Semicolon,
      //   },
      // ],
      memories: [
        { imageSrc: meeem1 },
        { imageSrc: meeem2 },
        { imageSrc: meeem3 },
      ],
    },
    {
      id: "3",
      title: "What’s Junior Camp",
      description:
        "Held during the mid-year vacation for two weeks, the camp offers various programming tracks such as Scratch, Python, TYP, and Arduino, helping young learners develop coding skills. In its eighth edition, new media tracks like motion graphics and graphic design were introduced, expanding the learning experience beyond programming.",
      bannerColor: "bg-red-600",
      bannerImage: juniorCamp,
      // speakers: [
      //   {
      //     title: "Dr. Sarah Mohamed",
      //     imageSrc: Semicolon,
      //   },
      // ],
      memories: [
        { imageSrc: meem1 },
        { imageSrc: meem2 },
        { imageSrc: meem3 },
        { imageSrc: meem4 },
        { imageSrc: meem5 },
        { imageSrc: meem6 },
        { imageSrc: meem7 },
        { imageSrc: meem8 },
        { imageSrc: meem9 },
      ],
    },
    {
      id: "4",
      title: "What’s KickStart",
      description:
        "The event spanned three days, covering computer science fundamentals on the first day, programming principles using Python on the second, and career roadmaps in fields like Data Science, Cybersecurity, AI, and Frontend on the third. It provided participants with the opportunity to explore different tech domains and take their first steps toward a career in technology.",
      bannerColor: "bg-red-600",
      bannerImage: kickStart,
      // speakers: [
      //   {
      //     title: "Dr. Sarah Mohamed",
      //     imageSrc: Semicolon,
      //   },
      // ],
      memories: [
        { imageSrc: mem_1 },
        { imageSrc: mem_2 },
        { imageSrc: mem_3 },
        { imageSrc: mem_4 },
        { imageSrc: mem_5 },
      ],
    },
    {
      id: "5",
      title: "What’s The Semicolon Show",
      description:
        "Event Semicolon was held in two versions, one online on Codeforces and one offline. Participants formed teams of 3 members, with prizes awarded to the top 3 teams. The competition aims to strengthen problem-solving abilities and serves as preparation for global contests like IEEE Extreme and ICPC.",
      bannerColor: "bg-red-600",
      bannerImage: Semicolon,
      speakers: [
        {
          title: "AbdallaMansour",
          name: "Abdalla Mansour",
          imageSrc: AbdallaMansour,
        },
        {
          title: "MahmoudAlGezawy",
          name: "Mahmoud AlGezawy",
          imageSrc: MahmoudAlGezawy,
        },
        {
          title: "mohamed Amr",
          name: "Mohamed Amr",
          imageSrc: mohamedAmr,
        },
        {
          title: "MuhammadAlBahnasi",
          name: "Muhammad AlBahnasi",
          imageSrc: MuhammadAlBahnasi,
        },
        {
          title: "TarekAlAbd",
          name: "Tarek Al Abd",
          imageSrc: tarekAlAbd,
        },
      ],
      memories: [
        { imageSrc: memory1 },
        { imageSrc: memory2 },
        { imageSrc: memory3 },
        { imageSrc: memory4 },
        { imageSrc: memory5 },
        { imageSrc: memory6 },
      ],
    },
  ];

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Event Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <section
        className={`relative h-[500px] w-full bg-center bg-cover ${
          !event.bannerImage ? event.bannerColor : ""
        }`}
        style={
          event.bannerImage
            ? { backgroundImage: `url(${event.bannerImage})` }
            : {}
        }
      />

      <div className="w-fit px-4 py-6 relative top-[-45px] bg-white m-auto rounded-2xl shadow-md mx-3 sm:mx-5 md:mx-10 lg:mx-20">
        <h2 className="flex flex-col text-center gap-2">
          <span
            className={`w-fit ${event.bannerColor} text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg md:text-xl font-bold`}
          >
            {event.title}
          </span>
          <span className="text-[#1A1A1A] text-sm sm:text-base md:text-lg font-semibold">
            {event.description}
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
                key={index}
                title={speaker.title}
                name={speaker.name}
                imageSrc={speaker.imageSrc}
                showLinkedin={false}
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
                key={index}
                src={memory.imageSrc}
                alt={`Memory ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EventDetails;
