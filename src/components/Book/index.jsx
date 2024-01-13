/* eslint-disable react/prop-types */
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'


const Book = ({ book }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
  };



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
  }
  return (
    <Card sx={{ minWidth: 275 }} className="card-item">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {book.title}
        </Typography>
        <Divider />
        <Typography variant="body2">
          {'Description'}
          <br />
          {book.description}
        </Typography>
      </CardContent>
      <div className='btn-container'>
      <Button onClick={handleOpen} size="small">
        Open details
      </Button>
      <Button variant="outlined" color="error" size='small' onClick={() => handleDelete(book.id)}>
        Delete
      </Button>
      </div>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {book.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {book.description}
          </Typography>
        </Box>
      </Modal>
    </Card>
  )
}

export default Book
