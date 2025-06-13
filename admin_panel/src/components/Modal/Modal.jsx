import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import styles from './Modal.module.scss';
import { Box, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { post } from '../../API/axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  // const [open, setOpen] = React.useState(props.open);
  const [thumbnail, setThumbnail] = React.useState();
  const handleClose = () => props?.setOpen(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const addFile = (e) => {
    setThumbnail(e.target.files[0]);
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    if (thumbnail) {
      formData.append('file', thumbnail)
      post('/commons/file/upload/', formData).then((response) => {
        if (response.status === 201) {
          post('/blog/', {
            'written_by': data.written_by,
            'title': data.title,
            'content': null,
            'thumbnail': response.data?.uuid
          }).then((response)=>{
            if(response.status===201){
              window.location.reload();
            }
          })
        }
      })
    }



  }

  return (

    <div>

      <Dialog
        fullScreen={fullScreen}
        open={props?.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>

          <DialogContent className={styles['blog']}>
            <p className={styles['header']}>Add Blog</p>
            <Box className={styles['blog-fields']}>
              <label htmlFor="title" className={styles['label']}>Author</label>
              <TextField id="outlined-required" placeholder='author' variant="outlined" fullWidth className={styles['text-field']} {...register('written_by', {required:'true'})} />
              <label htmlFor="title" className={styles['label']}>Title</label>
              <TextField id="outlined-required" placeholder='title' variant="outlined" fullWidth className={styles['text-field']} {...register('title', {required:'true'})} />
              <label htmlFor="title" className={styles['label']}>Thumbnail</label><br />
              <input type="file" onChange={(e) => addFile(e)} accept='image/*'/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} variant='contained' style={{backgroundColor:'red'}}>
              Cancel
            </Button>
            <Button onClick={handleClose} type='submit' variant='contained' style={{backgroundColor:'green'}}>
              Add Blog
            </Button>
          </DialogActions>
        </form>

      </Dialog>
    </div>

  );
}