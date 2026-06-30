import Footer from "../components/Footer";
import Section from "../components/Section";
import Card from "../components/Card";
import CardSlider from "../components/CardSlider";
import bahaa from "../assets/about-img/bahaa.jpg";
import firstPic from "../assets/about-img/firstpic.jpg";

const Board = () => {
  return (
    <div className="w-full overflow-hidden bg-gray-50/50 ">
      <Section
        text={`We Are IEEE\nThe Heart of Student Tech`}
        additionalText="A community of tech enthusiasts driving innovation"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="space-y-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-extrabold gap-3">
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-r-2xl text-sm sm:text-base tracking-wide shadow-sm whitespace-nowrap">
              Executive Board
            </span>
            <span className="text-[#1A1A1A]">
              The Visionaries: Driving Strategic Goals & Leadership
            </span>
          </h2>
          <div className="w-full">
            <CardSlider
              cards={[
                <Card
                  key="1"
                  title="Chairman"
                  imageSrc={bahaa}
                  text="Leading the branch toward sustainable impact and technological innovation."
                />,
                <Card
                  key="2"
                  title="Vice Chairman"
                  imageSrc={bahaa}
                  text="Coordinating operations and empowering team leaders."
                />,
                <Card
                  key="3"
                  title="Secretary"
                  imageSrc={bahaa}
                  text="Managing internal documentation and official communications."
                />,
                <Card
                  key="4"
                  title="Treasurer"
                  imageSrc={bahaa}
                  text="Overseeing financial planning and resources allocation."
                />,
                <Card
                  key="5"
                  title="Webmaster"
                  imageSrc={bahaa}
                  text="Maintaining digital presence and technical infrastructure."
                />,
              ]}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-extrabold gap-3">
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-r-2xl text-sm sm:text-base tracking-wide shadow-sm whitespace-nowrap">
              Operations Team
            </span>
            <span className="text-[#1A1A1A]">
              The Heart of Action: Making Events and Ideas Reality
            </span>
          </h2>
          <div className="w-full">
            <CardSlider
              cards={[
                <Card
                  key="op-1"
                  title="Operation Head"
                  imageSrc={bahaa}
                  text="Studies at Al-Azhar University Faculty of Languages and Translation, works as a freelance Arabic and Islamic Studies teacher"
                  linkedinLink="https://www.linkedin.com/in/muhammad-abdulmoneim/"
                />,
                <Card key="op-2" title="Coordinator" imageSrc={bahaa} />,
                <Card key="op-3" title="Coordinator" imageSrc={bahaa} />,
                <Card key="op-4" title="Coordinator" imageSrc={bahaa} />,
                <Card key="op-5" title="Coordinator" imageSrc={bahaa} />,
                <Card key="op-6" title="Coordinator" imageSrc={bahaa} />,
                <Card key="op-7" title="Coordinator" imageSrc={firstPic} />,
              ]}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-extrabold gap-3">
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-r-2xl text-sm sm:text-base tracking-wide shadow-sm whitespace-nowrap">
              Marketing & Media
            </span>
            <span className="text-[#1A1A1A]">
              The Voice of IEEE: Broadcasting Innovation to the World
            </span>
          </h2>
          <div className="w-full">
            <CardSlider
              cards={[
                <Card
                  key="mkt-1"
                  title="Media Head"
                  imageSrc={bahaa}
                  text="Studies at Al-Azhar University Faculty of Languages and Translation, works as a freelance Arabic and Islamic Studies teacher"
                  linkedinLink="https://www.linkedin.com/in/muhammad-abdulmoneim/"
                />,
                <Card key="mkt-2" title="Designer" imageSrc={bahaa} />,
                <Card key="mkt-3" title="Designer" imageSrc={bahaa} />,
                <Card key="mkt-4" title="Content Creator" imageSrc={bahaa} />,
                <Card key="mkt-5" title="Content Creator" imageSrc={bahaa} />,
                <Card key="mkt-6" title="Videographer" imageSrc={bahaa} />,
                <Card key="mkt-7" title="Photographer" imageSrc={firstPic} />,
              ]}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-2xl font-extrabold gap-3">
            <span className="bg-red-600 text-white px-4 py-1.5 rounded-r-2xl text-sm sm:text-base tracking-wide shadow-sm whitespace-nowrap">
              Logistics & Technical Committee
            </span>
            <span className="text-[#1A1A1A]">
              The Backbone: Ensuring Seamless Execution & Tech Excellence
            </span>
          </h2>
          <div className="w-full">
            <CardSlider
              cards={[
                <Card
                  key="tech-1"
                  title="Technical Head"
                  imageSrc={bahaa}
                  text="Studies at Al-Azhar University Faculty of Languages and Translation, works as a freelance Arabic and Islamic Studies teacher"
                  linkedinLink="https://www.linkedin.com/in/muhammad-abdulmoneim/"
                />,
                <Card key="tech-2" title="Logistics Member" imageSrc={bahaa} />,
                <Card key="tech-3" title="Logistics Member" imageSrc={bahaa} />,
                <Card
                  key="tech-4"
                  title="Technical Instructor"
                  imageSrc={bahaa}
                />,
                <Card
                  key="tech-5"
                  title="Technical Instructor"
                  imageSrc={bahaa}
                />,
                <Card
                  key="tech-6"
                  title="Technical Instructor"
                  imageSrc={bahaa}
                />,
                <Card key="tech-7" title="Moderator" imageSrc={firstPic} />,
              ]}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Board;
