import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import homeimg from "../../public/images/banner.png";
const Home = () => {
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const handleStateQuiz = () => {
    SetLoading(true);
    setTimeout(() => {
      navigate("/quiz");
      SetLoading(false);
    }, 3000);
  };
  const handleKnowMore = () => {
    navigate("/aboutus");
  };

  return (
    <section className="lg:w-9/12 md:w-[90%] mx-auto mt-12 flex flex-col md:flex-row-reverse justify-between items-center px-4">
      {loading && <Loading />}
      <div className="w-full md:w-1/2">
        <img src={homeimg} alt="banner" className="w-full mx-auto"></img>
      </div>
      <div className="w-full space-y-8 md:w-1/2">
        <h2 className="my-8 lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6 lg:leading-normal leading-normal mb-3 ">
          Learn new concepts for each question
        </h2>
        <p className="py-2 pl-2 mb-6 text-gray-500 border-l-4">
          We make learning English accessible and enjoyable.
        </p>
        <div className="flex flex-col items-center md:flex-row md:space-x-3">
          <button
            onClick={handleStateQuiz}
            className="w-full px-6 py-2 mb-8 text-white rounded md:w-auto bg-primary md:mb-0"
          >
            Start Quiz
          </button>

          <button
            onClick={handleKnowMore}
            className="inline-flex items-center justify-center w-full px-6 py-2 transition-all duration-300 ease-in border rounded md:w-auto text-primary hover:bg-primary hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2" // Adjusted icon size and added margin
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="flex items-center">Know more</span>{" "}
            {/* Center the text */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
