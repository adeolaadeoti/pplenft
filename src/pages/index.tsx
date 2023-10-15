import React from "react";
import Cursor from "@/components/cursor/cursor";
import Navigation from "@/components/navigation/navigation";
import Header from "@/components/header/header";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const navbarElement = React.useRef(null);

  return (
    <motion.div
      className="main"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Image
        src="/blur-yellow.png"
        className="yellow"
        width={282}
        height={28}
        alt=""
      />
      <Image
        src="/blur-purple.png"
        className="purple"
        width={282}
        height={28}
        alt=""
      />
      <Image
        src="/grain.gif"
        className="grain"
        width={282}
        height={28}
        alt=""
      />
      <Navigation ref={navbarElement} />
      <Header />
      <Cursor navbarElement={navbarElement} />
    </motion.div>
  );
}
