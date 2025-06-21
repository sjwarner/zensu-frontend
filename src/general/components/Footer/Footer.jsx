import React from "react";
import FeatherIcon from "feather-icons-react";

const Footer = () => {
  return (
    <footer className="py-5 bg-black text-center text-white flex flex-row justify-between">
      <div className="ml-8 mr-8">
        <p>
          Learn the{" "}
          <a
            href="https://tabletopbellhop.com/game-reviews/zensu/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300 hover:text-blue-400 visited:text-purple-600"
          >
            rules
          </a>
        </p>
      </div>
      <div className="ml-8 mr-8">
        <a
          className="m-auto"
          href="https://github.com/sjwarner/zensu-frontend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FeatherIcon
            icon="github"
            alt="Prometheus Concept GitHub repository"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
