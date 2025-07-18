const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas", err));


const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  description: String,
});

const Quiz = mongoose.model("Quiz", quizSchema);

const loginDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const LoginDetail = mongoose.model("LoginDetail", loginDetailsSchema);

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
        console.log(score);
      }
    });
    // const quizResult = new QuizResult({
    //   username,
    //   score,
    //   quizId
    // });

    // await quizResult.save();
    res.json({ score, total: questions.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit quiz answers" });
  }
});
app.get("/api/highest-score/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const highestScore = await QuizResult.findOne({ username }).sort({ score: -1 });
    if (highestScore) {
      res.json({ highestScore: highestScore.score });
    } else {
      res.json({ highestScore: 0 }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve highest score" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const existingUser = await LoginDetail.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new LoginDetail({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error details:", error); 
    res.status(500).json({ message: "Failed to register user" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await LoginDetail.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    console.log(user)
    res.status(200).json({username: user.username});

  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});