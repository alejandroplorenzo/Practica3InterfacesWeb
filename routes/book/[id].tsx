import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import Libro from "../../components/Libro.tsx";

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

type ApiResponse = {
  docs: Array<{
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
  }>;
};

export const handler: Handlers<BookAPI> = {
  GET: async (_req: Request, ctx: FreshContext<unknown, BookAPI>) => {
    const { id } = ctx.params;

    const response = await Axios.get(`https://openlibrary.org/works/${id}.json`);
    const author = response.data.authors?.[0];
    const author_id = author?.author?.key.replace("/authors/", "");
    let authorName = author?.author?.name || "AUTOR DESCONOCIDO";

    if (authorName === "AUTOR DESCONOCIDO") {
      const responseauthor = await Axios.get<ApiResponse>(`https://openlibrary.org/search.json?q=${response.data.title}`);
      const dato = responseauthor.data.docs?.[0];
      authorName = dato?.author_name?.[0] || "AUTOR DESCONOCIDO";
    }

    return ctx.render({
      id,
      title: response.data.title,
      description: response.data.description?.value || "NO SE ENCUENTRA DESCRIPCIÓN",
      created_date: response.data.created?.value || "NO SE ENCUENTRA FECHA",
      first_publish_date: response.data.first_publish_date || "NO SE ENCUENTRA FECHA",
      page_count: response.data.pages || 0,
      cover_i: response.data.covers?.[0],
      author_name: authorName,
      author_id,
    });
  },
};


const Page = (props: PageProps<BookAPI>) => {
  return <Libro {...props.data} />;
};

export default Page;
