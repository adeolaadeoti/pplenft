import "@/styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Animations = dynamic(() => import("@/hooks/animations"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Animations>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </Animations>
  );
}
