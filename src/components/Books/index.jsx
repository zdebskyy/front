import Book from '../Book'
import Form from '../Form'
import { useBooks } from '../../hooks/useBooks.js'

export default function Books() {
  const { books, isLoading } = useBooks()

  return (
    <>
      <Form/>
      <div className="card-container">
        {isLoading && 'is Loading ... '}
        {books.map((item) => (
          <Book key={item.id} book={item} />
        ))}
      </div>
    </>
  )
}
