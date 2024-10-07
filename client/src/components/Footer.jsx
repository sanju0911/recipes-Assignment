import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

export const Footer = () => {
  const handleContactUs = () => {
    window.location.href = `mailto:sanjayjanardhan231@gmail.com`;
  };

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 py-8 mt-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/sanju0911?tab=repositories"
            title="GitHub"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/sanju03203"
            title="LinkedIn"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
