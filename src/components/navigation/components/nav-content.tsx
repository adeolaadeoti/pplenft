import React from "react";
import styles from "../navigation.module.scss";
import { motion } from "framer-motion";
import NextLink from "next/link";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const menuSlide = {
  open: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  closed: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};
export default function NavContent({ isActive }: { isActive: boolean }) {
  const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q-100 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q100 ${window.innerHeight / 2} 100 0`;

  const curve = {
    closed: {
      d: initialPath,
    },
    open: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <motion.div
      variants={menuSlide}
      className={styles.menu}
      initial={false}
      animate={isActive ? "open" : "closed"}
    >
      <div className={styles.body}>
        <MenuList data={navItems} />
      </div>
      <svg className={styles.svgCurve}>
        <motion.path variants={curve}></motion.path>
      </svg>
    </motion.div>
  );
}

interface IMenuList {
  data: typeof navItems;
}

const menuItemVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function MenuList({ data }: IMenuList) {
  return (
    <motion.ul variants={variants} className={styles.menuList}>
      {data.map((data, index) => {
        return (
          <motion.li
            variants={menuItemVariants}
            whileHover={{ x: 10 }}
            key={index}
          >
            <NextLink className={styles.link} href={data.href}>
              {data.title}
            </NextLink>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
