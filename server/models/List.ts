import mongoose, { model, Schema } from "mongoose";

const ListSchema = new mongoose.Schema({
  listName: {
    type: String,
  },
  listDesc: {
    type: String,
  },
});

export default model("List", ListSchema);
