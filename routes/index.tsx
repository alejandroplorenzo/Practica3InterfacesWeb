import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import Principal from "../components/Principal.tsx";

const featuredBooks = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone"
];

type Book = {
  id: string;
  title: string;
  author: string;
  cover_i?: number;
};

type Data = {
  books: Book[];
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
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const books = await Promise.all(
      featuredBooks.map(async (title) => {
        const response = await Axios.get<ApiResponse>(`https://openlibrary.org/search.json?q=${title}`);
        const data = response.data.docs[0]; 
        return {
          id: data.key.replace("/works/", ""),
          title: data.title,
          author: data.author_name?.join(", ") || "AUTOR DESCONOCIDO",
          cover_i: data.cover_i,
        };
      })
    );
    return ctx.render({ books });
  },
};


const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <Principal books={props.data.books} />
    </div>
  );
};


export default Page;


