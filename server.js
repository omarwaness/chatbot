

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;
const API_KEY = "AIzaSyA8qb3zz3OLxwAgZGOVYh3DdAcU_GJoy_4"; // Replace with your actual API key

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serves static files from "public" folder

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// API route to handle AI requests
app.post("/ask-ai", async (req, res) => {
    const userPrompt = req.body.prompt;

    try {
        const result = await model.generateContent(userPrompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
