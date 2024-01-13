import * as React from 'react'


export const useBooks = () => {
    const [books, setBooks] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        const getBooks = async () => {
          await fetch('http://localhost:5000/api/books/', {
          method: 'GET',
        })
          .then((data) => data.json())
          .then((books) => {
            setBooks(books.result)
            setIsLoading(false)
          })
        }
        getBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return { books, isLoading }
}