import React from "react";
import Image from "next/image";
import styles from "./navigation.module.scss";
import Magnetic from "../magnetic/magnetic";
import NavContent from "./components/nav-content";

interface INavigation {}

const Navigation = React.forwardRef<HTMLDivElement, INavigation>(
  (props, ref) => {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <div className={`${styles.nav} ${isActive ? styles.navActive : ""}`}>
        <Image src="/pplenft.svg" alt="pple nft logo" width={73} height={22} />
        <div>
          <Magnetic>
            <div
              onClick={() => {
                setIsActive(!isActive);
              }}
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
