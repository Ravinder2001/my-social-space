import React from "react";
import styles from "./styles.module.scss";
function About() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>About My Social Space</div>
      <div className={styles.box}>
        <div className={styles.sub_heading}>Our Mission</div>
        <div className={styles.para}>
          At My Social Space, our mission is to create a welcoming online
          community where people can connect, share, and engage with others who
          have similar interests. We want to provide a safe and enjoyable space
          for users to express themselves and build meaningful connections.
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.sub_heading}>Meet the Developer - <span className={styles.name}>Ravinder Singh Negi</span></div>
        <div className={styles.para}>
          Hello! I'm Ravinder Singh Negi, a full-stack developer with 2 years of
          experience. I'm excited to bring "My Social Space" to life and create
          a platform that fosters genuine connections among users.
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.sub_heading}>Technology Stack</div>
        <ul className={styles.para}>
          <li>Frontend: React with TypeScript</li>
          <li>Backend: Node.js</li>
          <li>Database: PostgreSQL</li>
          <li>Real-time Communication: Sockets</li>
          <li>Hosting and Security: AWS</li>
        </ul>
        <div>
          Using these technologies, we aim to deliver a seamless and enjoyable
          user experience, making "My Social Space" a place where connections
          thrive.
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.sub_heading}>Join Us!</div>
        <div className={styles.para}>
          We invite you to be part of our growing community. Join "My Social
          Space" today and connect with friends, share your thoughts, and
          explore a world of shared experiences.
        </div>
      </div>
    </div>
  );
}

export default About;
