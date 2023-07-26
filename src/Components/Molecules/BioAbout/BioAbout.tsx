import React from "react";
import BioItems from "../BioItems/BioItems";
import styles from "./styles.module.scss";
function BioAbout() {
  let items = [
    {
      icon: "Briefcase",
      icon_color: "#11b7ee",
      text: "Software Engineer at INT",
    },
    {
      icon: "Home",
      icon_color: "#ee4811",
      text: "Lives in Kolkata",
    },
    {
      icon: "MapPin",
      icon_color: "#11ee36",
      text: "From Haldwani",
    },
    {
      icon: "Clock",
      icon_color: "#5e11ee",
      text: "Joined on July 2023",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <BioItems
            key={index}
            icon={item.icon}
            color={item.icon_color}
            text={item.text}
          />
        ))}
      </div>
      <div className={styles.button}>Edit Details</div>
    </div>
  );
}

export default BioAbout;
