import * as React from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
  const [lenis, setLenis] = React.useState<Lenis | null>();
  const reqIdRef = React.useRef<ReturnType<typeof requestAnimationFrame>>();

  React.useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      lenis?.on("scroll", () => ScrollTrigger.update());
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqIdRef.current as number);
  }, [lenis]);

  React.useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 2, //change scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    setLenis(lenis);

    // lenis.on('scroll', () => ScrollTrigger.update())

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);
};

const Animations: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSmoothScroll();
  return <>{children}</>;
};

export default Animations;
