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
const Texts = require("../model/movies");
const Folders = require("../model/directors");

const FileType = new GraphQLObjectType({
  name: "text",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    typeFile: { type: new GraphQLNonNull(GraphQLString) },
    children: {
      type: new GraphQLList(FileType),
      resolve(parent, args) {
        return Texts.find({ parent: parent.id });
      },
    },
    parent: {
      type: FileType,
      resolve(parent, args) {
        return Texts.findById(parent.parent);
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addFile: {
      type: FileType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        typeFile: { type: new GraphQLNonNull(GraphQLString) },
        children: { type: new GraphQLList(GraphQLID) },
        parent: { type: GraphQLID },
      },
      resolve(parent, args) {
        const file = new Texts({
          title: args.title,
          typeFile: args.typeFile,
          parent: args.parent,
        });
        return file.save();
      },
    },

    updateFile: {
      type: FileType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        typeFile: { type: GraphQLNonNull(GraphQLString) },
        parent: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Texts.findByIdAndUpdate(
          args.id,

          {
            $set: {
              title: args.title,
              typeFile: args.typeFile,
              parent: args.parent,
            },
          },
          { new: true }
        );
      },
    },

    deleteFile: {
      type: FileType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Texts.findByIdAndRemove(args.id);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    file: {
      type: FileType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Texts.findById(args.id);
      },
    },

    files: {
      type: new GraphQLList(FileType),
      resolve(parent, args) {
        return Texts.find({});
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
