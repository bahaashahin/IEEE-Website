import Footer from "../components/Footer";
import Section from "../components/Section";
import boy from "../assets/home-img/boy.svg";

const JoinUs = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Top Section */}
      <Section
        showIeeeBox={true}
        text={`Be a Part of the Next Tech\nRevolution`}
        additionalText="Contact us for assistance, feedback, or collaboration opportunities."
      />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
        {/* Intro Info Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 border border-gray-100 rounded-xl p-6 w-full mb-10 shadow-sm">
          <img
            src={boy}
            alt="Join us"
            className="w-[100px] h-[100px] sm:w-[119px] sm:h-[119px] object-cover shrink-0"
          />
          <div className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed text-center sm:text-left">
            By joining, you're entering a world of innovation and opportunities.
            Fill out the form to become part of our community of future tech
            leaders. Let's shape the future!
          </div>
        </div>

        {/* Join Us Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
          {/* Section 1: Basic Information */}
          <div className="bg-white">
            <h2 className="flex items-center text-lg sm:text-2xl gap-2 mb-6">
              <span className="font-bold bg-red-600 text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg shadow-sm">
                Basic Information:
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  E-mail <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education Information */}
          <div className="bg-white">
            <h2 className="flex items-center text-lg sm:text-2xl gap-2 mb-6">
              <span className="font-bold bg-red-600 text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg shadow-sm">
                Education Information:
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  University <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your university name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Graduation Year <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2028"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Committee Information */}
          <div className="bg-white">
            <h2 className="flex items-center text-lg sm:text-2xl gap-2 mb-6">
              <span className="font-bold bg-red-600 text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg shadow-sm">
                Committee Information:
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Position <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                >
                  <option value="">Select position</option>
                  <option value="member">Member</option>
                  <option value="head">Head</option>
                  <option value="vice-head">Vice Head</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Committee <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200"
                >
                  <option value="">Select committee</option>
                  <option value="technical">Technical</option>
                  <option value="multimedia">Multimedia</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Additional Information */}
          <div className="bg-white">
            <h2 className="flex items-center text-lg sm:text-2xl gap-2 mb-6">
              <span className="font-bold bg-red-600 text-white px-3 py-1 rounded-tr-2xl rounded-br-2xl text-base sm:text-lg shadow-sm">
                Additional Information:
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  LinkedIn
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 mb-4 md:mb-0"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Upload Your CV <span className="text-red-600">*</span>
                </label>
                <label
                  htmlFor="upload-cv"
                  className="w-full h-[50px] border border-dashed border-gray-300 rounded-lg text-center text-sm text-gray-500 cursor-pointer bg-white hover:bg-gray-50 flex items-center justify-center gap-2 transition duration-200 px-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16V4m0 0L3 8m4-4l4 4m4 8v4m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  <span className="truncate">
                    Click to upload CV (.pdf, .doc)
                  </span>
                  <input
                    id="upload-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1.5">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-[#05568D] text-white px-8 py-2.5 rounded-full hover:bg-[#033e66] active:scale-95 transition-all duration-300 font-semibold shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default JoinUs;
