import { Transition, motion } from "framer-motion";
import React from "react";
import styles from "./text-slidein.module.scss";

const transition: Transition = {
  duration: 0.8,
  type: "spring",
  stiffness: 50,
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
