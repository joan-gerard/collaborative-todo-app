import mongoose, { model, Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Done"],
  },
});

export default model("Todo", TodoSchema);
