import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
const Animations = dynamic(() => import("@/hooks/animations"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Animations>
      <Component {...pageProps} />
    </Animations>
  );
}
