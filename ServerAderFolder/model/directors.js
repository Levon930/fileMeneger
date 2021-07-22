const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foldersSchema = new Schema({
  name: String,
  content: Array,
});
module.exports = mongoose.model("folders", foldersSchema);
