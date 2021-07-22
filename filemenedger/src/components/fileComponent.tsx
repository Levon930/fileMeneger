import React, { useState } from 'react'
import { Add, Delete, Edit, Save } from "@material-ui/icons";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { fileDeleteMutation } from '../pages/rootFiles/filesMutation';

const Title = styled(Typography)`
    
  font-size: 18px;

`

const FileComponent: React.FC<any> = ({ file, EditFile, refetch }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState('')
  const [deleteFile, { }] = useMutation(fileDeleteMutation)



  const onSave = async (file: any) => {
    await EditFile(file.id, editTitle, file.typeFile,)
    await setEdit(false)
  }
  const deletes = async (id: string) => {
    await deleteFile({
      variables: {
        id
      }
    })
    await refetch()
  }
  const styles = {
    action: {
      display: 'flex', justifyContent: 'space-around'

    }
  }


  return (
    <Card style={{ width: '100px', margin: '5px' }}>
      <img style={{ width: '100%', }} src={file.typeFile === 'file' ? 'https://raw.githubusercontent.com/exced/react-file-manager/master/public/images/file.png' : 'https://raw.githubusercontent.com/exced/react-file-manager/master/public/images/folder.png'} />
      {!edit ? <Title>{file.title}</Title> : <TextField value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onClick={(e) => e.stopPropagation()} />}
      <CardActions style={styles.action}>

        {!edit ?
          (<IconButton onClick={(e) => { e.stopPropagation(); setEdit(true); setEditTitle(file.title) }} color="primary" aria-label='add'>
            <Edit />
          </IconButton>) :

          (<IconButton color="primary" aria-label='add' disabled={!editTitle} onClick={(e) => { e.stopPropagation(); onSave(file) }} >
            <Save />
          </IconButton>)}
        <IconButton aria-label='delete' onClick={(e) => { e.stopPropagation(); deletes(file.id) }}>
          <Delete />

        </IconButton>
      </CardActions>

    </Card>
  )

}
export default FileComponent