import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./models/Project.js";
import Contact from "./models/Contact.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true }));
app.use(express.json({ limit: "20kb" }));

const starterProjects = [
  {
    title: "CampusConnect AI",
    description: "A proposed campus platform concept bringing together academic resources, timetable updates, assignments and placement information. Replace this description with the actual work completed.",
    technologies: ["React", "JavaScript", "Node.js"],
    githubUrl: "",
    demoUrl: ""
  },
  {
    title: "Virtual Library Kiosk",
    description: "A proposed interactive kiosk concept for visitors to explore historical information through a virtual character. Replace this description with the actual work completed.",
    technologies: ["React", "Python", "3D"],
    githubUrl: "",
    demoUrl: ""
  },
  {
    title: "Smart Measurement Tamper Detection",
    description: "A project concept involving sensor readings and tamper monitoring for measuring instruments. Replace this description with the actual work completed.",
    technologies: ["Embedded Systems", "Sensors", "IoT"],
    githubUrl: "",
    demoUrl: ""
  }
];

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected"
  });
});

app.get("/api/projects", async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database not connected. Configure MONGODB_URI." });
    }
    let projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) projects = await Project.insertMany(starterProjects);
    res.json(projects);
  } catch (error) {
    console.error("Projects error:", error.message);
    res.status(500).json({ message: "Unable to retrieve projects." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Please complete all fields." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email." });
  }
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "Database is not connected." });
    }
    await Contact.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    res.status(201).json({ message: "Your message has been saved. Thank you!" });
  } catch (error) {
    console.error("Contact error:", error.message);
    res.status(500).json({ message: "Unable to save your message." });
  }
});

const port = process.env.PORT || 5000;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.error("MongoDB connection failed:", error.message));
} else {
  console.warn("MONGODB_URI is missing. Configure backend/.env to enable database features.");
}
app.listen(port, () => console.log(`Backend listening on port ${port}`));
