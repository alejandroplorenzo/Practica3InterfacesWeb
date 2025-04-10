import { PageProps } from "$fresh/server.ts";


export default function Layout({ Component}: PageProps) {
  return (
    <div >
         <header class="layout">
            <strong class="open-library">OPEN LIBRARY  </strong>
            <a href="/search"> BUSCADOR DE LIBROS </a>
            <a href="/"> PÁGINA PRINCIPAL </a>
         </header>
        <Component />
    </div>
  );
}