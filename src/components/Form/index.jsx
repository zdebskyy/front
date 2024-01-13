import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

const initialState = {
  title: '',
  description: '',
  cover: '',
}

const Form = () => {

  const [data, setData] = useState(initialState)


  const handleInput = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()

    const isEmptyValue = obj => Object.values(obj).some(x => x === null || x === '');

    if (isEmptyValue(data)) return 

    fetch('http://localhost:5000/api/books/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    setData(initialState)
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitForm}
        display={'flex'}
        alignItems={'center'}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          onChange={handleInput}
          value={data.title}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          onChange={handleInput}
          value={data.description}
        />
        <TextField
          id="cover"
          label="Cover"
          variant="outlined"
          onChange={handleInput}
          value={data.cover}
        />
        <Button type="submit" variant="outlined" size='large'>
          Add Book
        </Button>
      </Box>
    </>
  )
}

export default Form
