import { FunctionComponent } from "preact";

type Author = {
  name: string;
  bio?: string;
  books: { id: string; title: string }[];
};

const Autor: FunctionComponent<Author> = (props) => {
  const { name, bio, books } = props;

  return (
    <div>
      <h1>{name}</h1>
      <p>{bio}</p>

      <h2>LIBROS DEL AUTOR</h2>
      <div class="index">
        {books.map((ch) => (
          <div class="card" key={ch.id}>
            <h3>{ch.title}</h3>
            <a href={`/book/${ch.id}`}>Ver información del libro</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autor;
