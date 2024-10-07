import React from "react";

const Aboutus = () => {
  return (
    <section className="w-full flex justify-center items-center py-12 min-h-[80vh]">
      <div className="w-11/12 p-10 rounded-lg shadow-md lg:w-2/3 bg-secondary">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            About Learn<span className="text-primary">ENG</span>
          </h1>
        </header>
        <article>
          <p className="mb-6 text-lg font-medium leading-relaxed text-gray-600">
            Welcome to{" "}
            <strong>
              Learn<span className="text-primary">ENG</span>
            </strong>
            , your go-to platform for mastering the English language in a fun,
            interactive, and engaging way! At LearnENG, we believe that learning
            should be enjoyable, accessible, and effective, which is why we’ve
            combined the power of quizzes with language learning. Whether you're
            a beginner or looking to enhance your proficiency, our platform is
            designed to help you improve your English skills step by step.
          </p>
          <ul className="text-lg leading-relaxed text-gray-600 list-disc list-inside">
            <li className="mb-2">
              Learn at your own pace, anytime and anywhere.
            </li>
            <li className="mb-2">
              Challenge yourself with quizzes designed for all levels, from
              beginner to advanced.
            </li>
            <li>
              See the correct answers and score after you finish each quiz.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Aboutus;
