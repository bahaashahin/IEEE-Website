import Footer from "../components/Footer";
import Section from "../components/Section";
import CardEvent from "../components/CardEvent";
import firstPicc from "../assets/events-img/hand.png";
import secondPicc from "../assets/events-img/opportunity.png";
import thirdPicc from "../assets/events-img/calendar.png";
import fourthPicc from "../assets/events-img/career-development.png";
import aiGame from "../assets/events-img/AI Game.jpg";
import codeBaker from "../assets/events-img/Code Baker.jpg";
import juniorCamp from "../assets/events-img/Junior Camp.jpg";
import kickStart from "../assets/events-img/KickStart.jpg";
import Semicolon from "../assets/events-img/The Semicolon Show.jpg";

const Events = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Header Section */}
      <Section
        text={`We Are IEEE\nThe Heart of Student Tech`}
        additionalText="A community of tech enthusiasts driving innovation"
      />

      {/* Main Title Section */}
      <div className="px-4 sm:px-10 py-1 mt-8">
        <h2 className="flex flex-col lg:flex-row items-start lg:items-center text-xl sm:text-2xl font-bold gap-3 lg:gap-4 mb-8 leading-relaxed">
          <span className="bg-red-600 text-white px-3 py-1.5 rounded-tr-2xl rounded-br-2xl text-sm sm:text-base whitespace-nowrap shadow-sm">
            Our Events
          </span>
          <span className="text-[#1A1A1A] text-base sm:text-lg font-medium">
            Dive into a variety of events that fuel learning, creativity, and
            discovery.
          </span>
        </h2>
      </div>

      {/* Events Grid Container */}
      <div className="px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-12">
        <CardEvent
          id={1}
          image={aiGame}
          title="AI Game"
          text="An event introducing the fundamentals of artificial intelligence (AI) and its applications."
          date="29 Feb 2024"
          location="Al-Azhar University"
          className="grid grid-cols-1 lg:grid-cols-2"
        />
        <CardEvent
          id={2}
          image={codeBaker}
          title="Code Baker"
          text="A camp offering technical and non-technical training in various fields."
          date="End of year vacation"
          location="Online/Offline"
          className="grid grid-cols-1 lg:grid-cols-2"
        />
        <CardEvent
          id={3}
          image={juniorCamp}
          title="Junior Camp"
          text="Camp designed for children and teenagers aged 5 to 18, focusing on programming and digital skills."
          date="Mid-year vacation"
          location="Online/Offline"
          className="grid grid-cols-1 lg:grid-cols-2"
        />
        <CardEvent
          id={4}
          image={kickStart}
          title="KickStart"
          text="Program introducing participants to computer science, programming, and tech career paths."
          date="16, 18 Dec 2023"
          location="Al-Azhar University"
          className="grid grid-cols-1 lg:grid-cols-2"
        />
        <div className="md:col-span-2 flex justify-center w-full">
          <CardEvent
            id={5}
            image={Semicolon}
            title="The Semicolon Show"
            text="A problem-solving competition aimed at enhancing problem-solving skills and fostering a competitive spirit."
            date="Second Semester"
            location="Online/Offline"
            className="grid grid-cols-1 lg:grid-cols-2 w-full md:max-w-[calc(50%-12px)] lg:max-w-none"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
