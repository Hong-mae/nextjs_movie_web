import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "@/components/organisms/Navbar";
import { Noto_Sans_KR } from "next/font/google";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <div className={noto.className}>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
