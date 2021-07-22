import { gql } from "apollo-boost";

export const addFileMutation = gql`
  mutation ($title: String!, $typeFile: String!, $parent: ID) {
    addFile(title: $title, typeFile: $typeFile, parent: $parent) {
      title
      typeFile
      parent {
        id
      }
    }
  }
`;
export const fileDeleteMutation = gql`
  mutation ($id: ID!) {
    deleteFile(id: $id) {
      id
    }
  }
`;
export const FileEdit = gql`
  mutation ($id: ID!, $title: String!, $typeFile: String!, $parent: ID) {
  updateFile(id: $id, title: $title, typeFile: $typeFile, parent: $parent) {
    id
    title
    typeFile
    parent {
      id
    }
  }
}
`;
