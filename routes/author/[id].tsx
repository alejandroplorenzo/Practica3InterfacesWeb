import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Autor from "../../components/Autor.tsx";


type Book = {
  key: string;
  title: string;
};

type AuthorResponse = {
  name: string;
  bio?: { value: string };
};

type BooksResponse = {
  entries: Book[];
};

type Author = {
  name: string;
  bio?: string;
  books: Array<{ id: string; title: string }>;

};

export const handler: Handlers<Author> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Author>) => {
    const { id } = ctx.params;

    const authorResponse = await Axios.get<AuthorResponse>(`https://openlibrary.org/authors/${id}.json`);
    const authorData = authorResponse.data;

    const worksResponse = await Axios.get<BooksResponse>(`https://openlibrary.org/authors/${id}/works.json`);
    const worksData = worksResponse.data.entries.slice(0, 6);

    const books = worksData.map((ch) => ({
      id: ch.key.replace("/works/", ""),
      title: ch.title,
    }));

    return ctx.render({
      name: authorData.name,
      bio: authorData.bio?.value || "Biografía no disponible",
      books,
    });
  },
};

const Page = (props: PageProps<Author>) => {
  return <Autor {...props.data} />;
};

export default Page;

  