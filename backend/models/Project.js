import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: "" },
  demoUrl: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
