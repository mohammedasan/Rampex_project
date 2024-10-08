// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");  // for hashing passwords
// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// // Define quiz schema
// const quizSchema = new mongoose.Schema({
//   question: String,
//   options: [String],
//   answer: String,
//   description: String,
// });

// const Quiz = mongoose.model("Quiz", quizSchema);

// // Define loginDetails schema
// const loginDetailsSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const LoginDetail = mongoose.model("LoginDetail", loginDetailsSchema);

// // ================= Quiz API Routes ==================
// // Fetch all quiz questions
// app.get("/api/questions", async (req, res) => {
//   try {
//     const questions = await Quiz.find();
//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch quiz questions" });
//   }
// });

// // Add a new quiz question
// app.post("/api/questions", async (req, res) => {
//   const { question, options, answer, description } = req.body;
//   try {
//     const newQuiz = new Quiz({ question, options, answer, description });
//     await newQuiz.save();
//     res.status(201).json({ message: "Quiz question added successfully", quiz: newQuiz });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add quiz question" });
//   }
// });

// // Update a quiz question
// app.put("/api/questions/:id", async (req, res) => {
//   const { id } = req.params;
//   const { question, options, answer, description } = req.body;
//   try {
//     const updatedQuiz = await Quiz.findByIdAndUpdate(
//       id,
//       { question, options, answer, description },
//       { new: true }
//     );
//     if (!updatedQuiz) {
//       return res.status(404).json({ message: "Quiz question not found" });
//     }
//     res.json({ message: "Quiz question updated successfully", quiz: updatedQuiz });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update quiz question" });
//   }
// });

// // Delete a quiz question
// app.delete("/api/questions/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedQuiz = await Quiz.findByIdAndDelete(id);
//     if (!deletedQuiz) {
//       return res.status(404).json({ message: "Quiz question not found" });
//     }
//     res.json({ message: "Quiz question deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete quiz question" });
//   }
// });

// // Submit quiz answers and calculate the score
// app.post("/api/submit", async (req, res) => {
//   const { answers } = req.body;

//   try {
//     const questions = await Quiz.find();
//     let score = 0;

//     questions.forEach((question) => {
//       if (answers[question._id] === question.answer) {
//         score += 1;
//       }
//     });

//     res.json({ score, total: questions.length });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to submit quiz answers" });
//   }
// });

// // ================= Login/Signup API Routes ==================
// // Signup route
// app.post("/api/signup", async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await LoginDetail.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new LoginDetail({ username, email, password: hashedPassword });

//     // Save the user in the database
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to register user" });
//   }
// });

// // Login route
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await LoginDetail.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     res.json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to login" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  
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

const loginDetailsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const LoginDetail = mongoose.model("LoginDetail", loginDetailsSchema);

// ================= Quiz API Routes ==================
// Fetch all quiz questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Quiz.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quiz questions" });
  }
});

// Add a new quiz question
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

// Update a quiz question
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

// Delete a quiz question
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

// Submit quiz answers and calculate the score
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
    const quizResult = new QuizResult({
      username,
      score,
      quizId: /* if needed, reference to the quiz id, e.g., question.quizId */,
    });

    await quizResult.save();
    res.json({ score, total: questions.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit quiz answers" });
  }
});
app.get("/api/highest-score/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const highestScore = await QuizResult.findOne({ username }).sort({ score: -1 }); // Get the highest score
    if (highestScore) {
      res.json({ highestScore: highestScore.score });
    } else {
      res.json({ highestScore: 0 }); // No score found for the user
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve highest score" });
  }
});

// ================= Login/Signup API Routes ==================
// Signup route
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await LoginDetail.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new LoginDetail({ username, email, password: hashedPassword });

    // Save the user in the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error details:", error); 
    res.status(500).json({ message: "Failed to register user" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await LoginDetail.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    console.log(username)
    // Return success with the username
    res.status(200).json({username: user.username});
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});