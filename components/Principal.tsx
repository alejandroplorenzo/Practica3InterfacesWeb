import { FunctionComponent } from "preact";

type Book = {
  id: string;
  title: string;
  author: string;
  cover_i?: number;
};

type Data = {
  books: Book[];
};

const Principal: FunctionComponent<Data> = (props) => {
  const { books } = props; 
  return (
    <div class="index">
      {books.map((book) => (
        <div class="card" key={book.id}>
          <h3>Título: {book.title}</h3>
          <p>Autor: {book.author}</p>
          <p>ID Libro: {book.id}</p>
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            alt={book.title}
          />
          <a href={`/book/${book.id}`}>DATOS LIBRO</a>
        </div>
      ))}
    </div>
  );
};

export default Principal;
