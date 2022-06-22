import mongoose, { model, Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  deadline: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Done"],
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
});

export default model("Todo", TodoSchema);
