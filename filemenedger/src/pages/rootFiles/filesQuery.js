import { gql } from "apollo-boost";

export const files_Query = gql`
  query {
    files {
      id
      title
      typeFile
      children {
        title
        id
      }
      parent {
        title
        id
      }
    }
  }
`;
export const file_query = gql`
  query ($id: ID) {
    file(id: $id) {
      title
      id
      typeFile
      children {
        title
        id
        typeFile
        
      }
      parent {
        title
        id
      }
    }
  }
`;
