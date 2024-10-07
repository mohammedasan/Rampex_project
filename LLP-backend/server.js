const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  description: String,
});
const Quiz = mongoose.model("Quiz", quizSchema);
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Quiz.find(); 
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quiz questions" });
  }
});
app.post("/api/questions", async (req, res) => {
  const { question, options, answer, description } = req.body;
  try {
    const newQuiz = new Quiz({ question, options, answer, description });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz question added successfully", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to add quiz question" });
  }
});
app.put("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { question, options, answer, description } = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { question, options, answer, description },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.json({ message: "Quiz question updated successfully", quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ message: "Failed to update quiz question" });
  }
});
app.delete("/api/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz question not found" });
    }

    res.json({ message: "Quiz question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete quiz question" });
  }
});
app.post("/api/submit", async (req, res) => {
  const { answers } = req.body;

  try {
    const questions = await Quiz.find();
    let score = 0;

    questions.forEach((question) => {
      if (answers[question._id] === question.answer) {
        score += 1;
      }
    });

    res.json({ score, total: questions.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit quiz answers" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
