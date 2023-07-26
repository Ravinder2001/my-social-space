import React from "react";
import styles from "./styles.module.scss";
import BioHeader from "../../Molecules/BioHeader/BioHeader";
import BioItems from "../../Molecules/BioItems/BioItems";
import BioAbout from "../../Molecules/BioAbout/BioAbout";
function BioContainer() {
 
  return (
    <div className={styles.container}>
      <BioHeader />
      <BioAbout/>
      

    </div>
  );
}

export default BioContainer;
