import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

// const CookieProvider = ({children}) => {
//   return (<SecureCookiesProvider>{children}</SecureCookiesProvider>)
// }

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // const getLayout =
  //   Component.getLayout ??
  //   ((page) => (
  // <Layout>
  //   <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>
  // </Layout>;
  //   ));

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}
