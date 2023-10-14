import React from "react";
import Image from "next/image";
import styles from "./navigation.module.scss";
import Magnetic from "../magnetic/magnetic";

interface INavigation {}

const Navigation = React.forwardRef<HTMLDivElement, INavigation>(
  (props, ref) => {
    return (
      <div className={styles.nav}>
        <Image src="/pplenft.svg" alt="pple nft logo" width={73} height={22} />
        <div>
          <Magnetic>
            <div className={styles.burger}>
              <div ref={ref} className={styles.bounds}></div>
            </div>
          </Magnetic>
        </div>
      </div>
    );
  }
);

Navigation.displayName = "Navigation";

export default Navigation;
