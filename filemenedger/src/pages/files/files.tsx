import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { files_Query, file_query } from "../rootFiles/filesQuery";
import { addFileMutation, FileEdit } from "../rootFiles/filesMutation";
import { Grid, Typography } from "@material-ui/core";
import Form from "../../components/form";
import FileComponent from "../../components/fileComponent";
import { useHistory, useParams } from 'react-router-dom'

const Folder = () => {


  const slug: { slug: string } = useParams()






  const { data, loading, error, refetch } = useQuery(file_query, { fetchPolicy: 'cache-and-network', variables: { id: slug.slug } })


  const [addFile, { }] = useMutation(addFileMutation)
  const [updateFile, { }] = useMutation(FileEdit)
  const history = useHistory()
  const AddFile = async (title: string) => {
    await addFile({
      variables: {
        title,
        typeFile: 'file',
        parent: slug.slug
      }
    })
    await refetch()
  }

  const AddFolder = async (title: string) => {
    await addFile({
      variables: {
        title,
        typeFile: 'folder',
        parent: slug.slug
      }
    })
    await refetch()
  }

  const EditFile = async (id: string, title: string, typeFile: string, parent: (string | null)) => {
    console.log(id, title, typeFile, parent);


    await updateFile({
      variables: {
        id,
        title,
        typeFile,
        parent: slug.slug

      }
    })
    await refetch()
  }
  const openFolder = (id: string) => {
    history.push(`/folder/${id}`)
  }
  if (!data) {
    return null
  }

  return (
    <Grid>
      {data.file.typeFile === 'folder' ? <Form AddFolder={AddFolder} AddFile={AddFile} /> : null}
      <Typography>{data.file.title}</Typography>
      <Grid style={{ display: 'flex' }}>
        {
          data?.file?.children.map((file: any) => {
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
export default Folder;
