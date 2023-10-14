import { motion } from "framer-motion";
import React from "react";
import styles from "./text-slidein.module.scss";

const transition: { duration: number; ease: number[] } = {
  duration: 0.7,
  ease: [0.6, 0.01, -0.05, 0.9],
};

interface ITextSlideIn {
  children: React.ReactNode;
  delay?: number;
}
export default function TextSlideIn({ children, delay = 0.6 }: ITextSlideIn) {
  return (
    <motion.div className={styles.text}>
      <motion.div
        initial={{
          y: 400,
        }}
        animate={{
          y: 0,
          transition: { ...transition, delay },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
