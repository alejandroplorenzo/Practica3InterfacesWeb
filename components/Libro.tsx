import { FunctionComponent } from "preact";

type BookAPI = {
    id: string;
    title: string;
    description?: string;
    created_date?: string;
    first_publish_date?: string;
    page_count?: number;
    cover_i?: number;
    authors?: Array<{
      author: {
        key: string;
        name: string;
      };
    }>;
    author_name?: string;
    author_id?: string;
};

const Libro: FunctionComponent<BookAPI> = (props) => {
    const {
        title,
        description,
        created_date,
        first_publish_date,
        page_count,
        cover_i,
        author_name,
        author_id,
      } = props;
  return (
    <div >
        <h1>{title}</h1>
        <img
          src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`}
          alt={title}
        />
      <p><strong>Descripción:</strong> {description}</p>
      <p><strong>Año de creación:</strong> {created_date}</p>
      <p><strong>Primera publicación:</strong> {first_publish_date}</p>
      <p><strong>Número de páginas:</strong> {page_count}</p>
      <p>
        <strong>Autor:</strong> {author_name}
        <a href={`/author/${author_id}`}> (DATOS AUTOR)</a>
      </p>
    </div>
  );
};

export default Libro;