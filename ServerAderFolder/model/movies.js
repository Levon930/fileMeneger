const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const textsSchema = new Schema({
  title: String,
  children: Array,
  typeFile:String,
  parent:String
  
});
module.exports = mongoose.model("texts", textsSchema);
