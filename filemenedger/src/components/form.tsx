import React, { useState } from "react";
import {
  Button,
  Card,
  TextField
} from "@material-ui/core";
import { Add } from "@material-ui/icons";


const Form: React.FC<any> = ({ AddFolder, AddFile }) => {

  const [title, setTitle] = useState('')

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', width: '200px', position: 'fixed', right: 0 }} >
      <TextField placeholder='new file else folder' value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button startIcon={<Add />} disabled={!title} onClick={() => AddFolder(title)}>
        Add Folder
      </Button>
      <Button startIcon={<Add />} disabled={!title} onClick={() => AddFile(title)}>
        Add File
      </Button >
    </Card>
  )
}
export default Form