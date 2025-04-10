import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Busqueda from "../components/Busqueda.tsx";
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

type ApiResponse = {
  docs: Array<{
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
  }>;
};

export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const titulo = url.searchParams.get("q") || "";
    let books: Book[] = [];

    if (titulo) {
      const response = await Axios.get<ApiResponse>(`https://openlibrary.org/search.json?q=${titulo}`); 
      books = response.data.docs.map((ch) => ({
        id: ch.key.replace("/works/", ""),
        title: ch.title,
        author: ch.author_name?.join(", ") || "Autor desconocido",
        cover_i: ch.cover_i,
      }));
    }

    return ctx.render({ books, titulo });
  },
};
  

  const Page = (props: PageProps<Data>) => {
    return <Busqueda {...props.data} />;
  };
  
  export default Page;
  
  
  