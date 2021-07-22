import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { files_Query, file_query } from "./filesQuery";
import { addFileMutation, FileEdit } from "./filesMutation";

import {

  Grid,

} from "@material-ui/core";

import Form from "../../components/form";

import FileComponent from "../../components/fileComponent";
import { Link, useHistory } from "react-router-dom";


const Files = () => {

  const history = useHistory()

  const { data, loading, error, refetch } = useQuery(files_Query, { fetchPolicy: 'cache-and-network' })

  const [addFile, { }] = useMutation(addFileMutation)
  const [updateFile, { }] = useMutation(FileEdit)

  const AddFile = async (title: string) => {
    await addFile({
      variables: {
        title,
        typeFile: 'file'
      }
    })
    await refetch()
  }

  const AddFolder = async (title: string) => {
    await addFile({
      variables: {
        title,
        typeFile: 'folder'
      }
    })
    await refetch()
  }

  const EditFile = async (id: string, title: string, typeFile: string) => {
    await updateFile({
      variables: {
        id,
        title,
        typeFile,
      }
    })
    await refetch()
  }
  const openFolder = (id: string) => {
    history.push(`/folder/${id}`)
  }

  return (
    <Grid>
      <Form AddFolder={AddFolder} AddFile={AddFile} />
      <Grid style={{ display: 'flex' }}>
        {
          data?.files.filter((data: any) => data.parent == null).map((file: any) => {
            return (
              <Grid key={file.id} onClick={() => openFolder(file.id)}>

                <FileComponent file={file} EditFile={EditFile} refetch={refetch} />

              </Grid>
            )
          })
        }
      </Grid>

    </Grid>
  )
};
export default Files;
