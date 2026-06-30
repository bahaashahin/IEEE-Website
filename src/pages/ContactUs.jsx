import Footer from "../components/Footer";
import Section from "../components/Section";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <Section
        showSocialIcons={true}
        text={`Get in touch with us. \nWe're here to assist you.`}
        additionalText="Contact us for assistance, feedback, or collaboration opportunities."
      />

      {/* Form Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <FaUser className="text-[#05568D]" />
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 text-gray-800"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <FaEnvelope className="text-[#05568D]" />
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 text-gray-800"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <FaPhone className="text-[#05568D]" />
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 text-gray-800"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
              <FaCommentDots className="text-[#05568D]" />
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Write your message here..."
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#05568D]/40 focus:border-[#05568D] transition duration-200 text-gray-800 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-[#05568D] text-white px-8 py-2.5 rounded-full hover:bg-[#033e66] active:scale-95 transition-all duration-300 font-semibold shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Contact Info Footer Bar */}
      <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-8 mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800 max-w-5xl">
          <div className="flex flex-col justify-center">
            <h4 className="text-xs font-bold tracking-wider uppercase text-gray-400">
              Contact Info
            </h4>
            <p className="text-xl font-extrabold mt-2 text-gray-900 leading-snug">
              We are always happy to assist you
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold uppercase mb-1 text-gray-900">
              Contact Us
            </h4>
            <div className="w-8 h-0.5 bg-[#05568D] mb-4"></div>
            <p className="text-sm sm:text-base text-gray-600">
              <strong className="text-gray-900">Email:</strong>{" "}
              <a
                href="mailto:alazharieee@gmail.com"
                className="hover:text-[#05568D] transition duration-200"
              >
                alazharieee@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold uppercase mb-1 text-gray-900">
              Social Media
            </h4>
            <div className="w-8 h-0.5 bg-[#05568D] mb-4"></div>
            <div className="flex gap-3">
              {[
                {
                  icon: FaFacebookF,
                  url: "https://www.facebook.com/share/1A7kWQHZ4e/",
                },
                {
                  icon: FaInstagram,
                  url: "https://www.instagram.com/ieee.alazhar?igsh=MTAwN2tmd2doNG44NA==",
                },
                {
                  icon: FaLinkedinIn,
                  url: "https://www.linkedin.com/company/ieee-alazhar/",
                },
              ].map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#05568D] text-white flex items-center justify-center shadow hover:bg-[#033e66] hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
