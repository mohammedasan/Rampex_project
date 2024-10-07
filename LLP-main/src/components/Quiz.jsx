import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        const data = await response.json();
        setQuestions(data);
        const initialAnswers = {};
        data.forEach((question) => {
          initialAnswers[question._id] = "";
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    if (showResult) return; 
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const result = await response.json();
      setScore(result.score);
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setLoading(false);
      setShowResult(true);
    }
  };
  const handleReset = () => {
    const resetAnswers = {};
    questions.forEach((question) => {
      resetAnswers[question._id] = "";
    });
    setAnswers(resetAnswers);
    setShowResult(false);
    setScore(0);
  };
  return (
    <section>
      <div className="md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col md:flex-row">
        <div className="md:w-[70%]">
          {questions.map((qus, ind) => (
            <div
              key={qus._id} 
              className="px-4 py-3 m-3 border border-gray-200 rounded shadow-sm"
            >
              <p className="flex items-center p-2 text-xs rounded cursor-pointer">
                <span className="flex items-center justify-center w-8 h-8 mr-3 text-green-800 rounded-full bg-primary">
                  {ind + 1}
                </span>
                {qus.question}
              </p>
              <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
                {qus.options.map((option, index) => (
                  <div
                    onClick={() => handleAnswerSelect(qus._id, option)} 
                    key={index}
                    className={`border p-2 border-gray-200 rounded cursor-pointer text-sx ${
                      answers[qus._id] === option ? "bg-gray-300" : ""
                    } ${showResult ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <p className="text-[10px] mb-1">Option {index + 1}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            className="px-6 py-2 ml-3.5 text-white rounded bg-primary"
            onClick={handleSubmit}
            disabled={loading} 
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </button>
          {showResult && (
            <button
              className="px-6 py-2 ml-6 text-white bg-red-500 rounded"
              onClick={handleReset}
            >
              Reset Quiz
            </button>
          )}
        </div>
        <div className="md:w-[30%] w-full p-4">
          {showResult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score: {score}</h3>
              {questions.map((qus, index) => (
                <div key={qus._id} className="mt-4">
                  <h4 className="text-lg font-bold">
                    {index + 1}. {qus.question}
                  </h4>
                  <p
                    className={`text-sm ${
                      answers[qus._id] === qus.answer
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Your Answer: {answers[qus._id] || "Not answered"} <br />
                    Correct Answer: {qus.answer}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {qus.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Quiz;
