import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  const handleContactUs = () => {
    window.location.href = `mailto:sanjayjanardhan231@gmail.com`;
  };

  return (
    <footer className="bg-gradient-to-br from-indigo-600 to-teal-500 py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://github.com/sanju0911?tab=repositories"
            title="GitHub"
            className="text-white hover:text-yellow-400 transform hover:scale-110 transition duration-300 ease-in-out"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://linkedin.com/in/sanju03203"
            title="LinkedIn"
            className="text-white hover:text-yellow-400 transform hover:scale-110 transition duration-300 ease-in-out"
          >
            <FaLinkedin size={30} />
          </a>
        </div>

        <p className="text-white text-sm font-light mb-4">
          Connect with me or feel free to reach out!
        </p>

        <button
          onClick={handleContactUs}
          className="text-white border border-white py-2 px-6 rounded-full hover:bg-white hover:text-teal-500 font-medium transition duration-300"
        >
          Contact Us
        </button>
      </div>
    </footer>
  );
};
