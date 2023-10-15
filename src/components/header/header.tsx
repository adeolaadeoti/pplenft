import React, { useCallback } from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import { motion, useMotionValue, useSpring } from "framer-motion";
import TextSlideIn from "../text-slidin/text-slidein";
import HoverText from "../hover-text/hover-text";
import { StaggeredText } from "../staggered-text/staggered-text";

export default function Header() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = {
    damping: 50,
    stiffness: 500,
    mass: 0.5,
    duration: 1.5,
  };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let normX = e.clientX / window.innerWidth - 0.5;
      let normY = e.clientY / window.innerHeight - 0.5;

      let moveX = normX * 200;
      let moveY = normY * 100;

      mouse.x.set(moveX);
      mouse.y.set(moveY);
    },
    [mouse.y, mouse.x]
  );

  const willSmithRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const willSmithElement = willSmithRef.current;
    willSmithElement!.addEventListener("mousemove", handleMouseMove);

    return () => {
      willSmithElement!.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <TextSlideIn>
          <h1> Giving the middle</h1>
        </TextSlideIn>
        <TextSlideIn delay={0.8}>
          <div className={styles.flex}>
            <h1> finger &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </h1>
            <h1 className={styles.yellow}> to traditional</h1>
          </div>
        </TextSlideIn>
        <TextSlideIn delay={1}>
          <h1 className={styles.yellow}>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; nfts!
          </h1>
        </TextSlideIn>
      </div>

      <motion.div
        ref={willSmithRef}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
        className={styles.willSmith}
      >
        <Image
          src="/will-smith.png"
          width={992.59}
          height={789}
          alt="will smith nft"
        />
      </motion.div>

      <Image
        src="/yellow-cube.png"
        className={styles.cube}
        width={256.141}
        height={456.141}
        alt=""
      />
      <div className={styles.description}>
        <TextSlideIn delay={1}>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; welcome to the pple. community, a
            tribe of 7,648 obese celebs that partied too much and didn’t
            exercise enough.
          </p>
        </TextSlideIn>
        <TextSlideIn delay={1.1}>
          <button>
            <HoverText href="" text="join discord" />
          </button>
        </TextSlideIn>
      </div>
    </header>
  );
}
