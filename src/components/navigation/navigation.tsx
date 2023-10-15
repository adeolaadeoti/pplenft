import React from "react";
import Image from "next/image";
import styles from "./navigation.module.scss";
import Magnetic from "../magnetic/magnetic";
import NavContent from "./components/nav-content";

interface INavigation {}

const Navigation = React.forwardRef<HTMLDivElement, INavigation>(
  (props, ref) => {
    const [isActive, setIsActive] = React.useState(false);
    const [addBlend, setAddBlend] = React.useState(true);

    const handleToggle = () => {
      setIsActive(!isActive);
      setTimeout(() => {
        if (!isActive) {
          setAddBlend(false);
        } else {
          setAddBlend(true);
        }
      }, 1000);
    };

    return (
      <div
        className={`${styles.nav} ${
          isActive
            ? styles.navRemoveBlendMode
            : addBlend
            ? styles.navAddBlendMode
            : ""
        }`}
      >
        <Image src="/pplenft.svg" alt="pple nft logo" width={73} height={22} />
        <div>
          <Magnetic>
            <div
              onClick={handleToggle}
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            >
              <div ref={ref} className={styles.bounds}></div>
            </div>
          </Magnetic>
        </div>
        <NavContent isActive={isActive} />
      </div>
    );
  }
);

Navigation.displayName = "Navigation";

export default Navigation;
