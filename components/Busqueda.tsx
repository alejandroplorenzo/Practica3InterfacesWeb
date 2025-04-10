import { FunctionComponent } from "preact";

type Book = {
  id: string;
  title: string;
  author: string;
  cover_i?: number;
};

type Data = {
  books: Book[];
  titulo?: string;
};

const Busqueda: FunctionComponent<Data> = (props) => {
  const { books, titulo } = props;

  return (
    <div>
      <h1>BUSCADOR DE LIBROS</h1>
      <form method="GET" action="/search">
        <input type="text" name="q" placeholder="Título del libro" defaultValue={titulo} />
        <button type="submit">Buscar</button>
      </form>
        <div class="index">
          {books.map((ch) => (
            <div class="card" key={ch.id}>
                <img
                  src={`https://covers.openlibrary.org/b/id/${ch.cover_i}-L.jpg`}
                  alt={ch.title}
                />
                <h3>{ch.title}</h3>
                <p>{ch.author}</p>
                <a href={`/book/${ch.id}`}>DATOS LIBRO</a>
            </div>
          ))}
        </div>
    </div>
  );
};

export default Busqueda;


