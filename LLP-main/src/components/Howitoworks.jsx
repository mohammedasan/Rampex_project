import React from "react";
import yourImage from "../../public/images/undraw_Questions_re_1fy7.png"; // Update the path to the uploaded image

const Howitoworks = () => {
  return (
    <section className="w-full flex flex-col items-center py-12 min-h-[70vh]">
      <div className="flex flex-col-reverse w-11/12 p-10 bg-white rounded-lg  lg:w-[90%] lg:flex-row ">
        {/* Text Section */}
        <div className="flex-1 mb-6 lg:mb-0 lg:mr-6 md:mt-14">
          <header className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800">How It Works</h1>
          </header>
          <article>
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              At{" "}
              <strong>
                Learn<span className="text-primary">ENG</span>
              </strong>
              , we've designed our quiz platform to help you learn effectively
              and enjoyably. Here's how it works:
            </p>
            <ul className="mb-6 text-lg leading-relaxed text-gray-600 list-disc list-inside">
              <li className="mb-2">
                Each round consists of{" "}
                <strong>
                  <span className="text-primary">6 questions</span>
                </strong>
                .
              </li>
              <li className="mb-2">
                For each question, you will be provided with{" "}
                <strong>
                  <span className="text-primary">4 options</span>
                </strong>
                .
              </li>
              <li className="mb-2">
                Select the option you think is correct and click on{" "}
                <strong>
                  <span className="text-primary">Submit</span>{" "}
                </strong>
                .
              </li>
              <li className="mb-2">
                After submitting, you will see your{" "}
                <strong>
                  {" "}
                  <span className="text-primary">score</span>
                </strong>{" "}
                for that round.
              </li>
              <li className="mb-2">
                You can then{" "}
                <strong>
                  {" "}
                  <span className="text-primary">restart</span>
                </strong>{" "}
                the quiz to try again and improve your score!
              </li>
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              We hope you enjoy learning with our quizzes and enhance your
              English skills effectively!
            </p>
          </article>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={yourImage}
            alt="How it works illustration"
            className="w-full h-auto rounded-lg "
          />
        </div>
      </div>
    </section>
  );
};

export default Howitoworks;
