import mongoose, { model, Schema } from "mongoose";

const TodoSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  // },
  content: {
    type: String,
  },
  deadline: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  status: {
    type: String,
    enum: ["Pending", "Done"],
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
});

export default model("Todo", TodoSchema);
