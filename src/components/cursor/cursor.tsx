import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./cursor.module.scss";
import {
  motion,
  useMotionValue,
  useSpring,
  transform,
  animate,
} from "framer-motion";

interface Props {
  navbarElement: React.RefObject<HTMLElement>;
}

export default function CustomCursor({ navbarElement }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorSize: number = isHovered ? 60 : 15;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = (distance: { x: number; y: number }) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursor.current!, { rotate: `${angle}rad` });
  };

  const manageMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (navbarElement.current) {
        const { left, top, height, width } =
          navbarElement.current.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };

        if (isHovered) {
          const distance = { x: clientX - center.x, y: clientY - center.y };
          rotate(distance);
          const absDistance = Math.max(
            Math.abs(distance.x),
            Math.abs(distance.y)
          );
          const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
          const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
          scale.x.set(newScaleX);
          scale.y.set(newScaleY);
          mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
          mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
        } else {
          mouse.x.set(clientX - cursorSize / 2);
          mouse.y.set(clientY - cursorSize / 2);
        }
      }
    },
    [cursorSize, isHovered, mouse.x, mouse.y, navbarElement, scale.x, scale.y]
  );

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
    animate(cursor.current!, { scaleX: 1, scaleY: 1 }, { type: "spring" });
  };

  useEffect(() => {
    let navbar: any = navbarElement.current;
    if (navbar) {
      navbar.addEventListener("mouseenter", manageMouseOver);
      navbar.addEventListener("mouseleave", manageMouseLeave);
    }
    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      if (navbar) {
        navbar.removeEventListener("mouseenter", manageMouseOver);
        navbar.removeEventListener("mouseleave", manageMouseLeave);
      }
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [isHovered, navbarElement, manageMouseMove]);

  return (
    <div className={styles.cursorContainer}>
      <motion.div
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          scaleX: scale.x,
          scaleY: scale.y,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        className={styles.cursor}
        ref={cursor}
      ></motion.div>
    </div>
  );
}
