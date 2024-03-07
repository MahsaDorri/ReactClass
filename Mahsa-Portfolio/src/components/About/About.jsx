import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Data Analyst</h3>
              <p>
              I am a Software Engineering graduate with a passion for quantitative analysis and a drive to innovate in the asset management sector. Proficient in Python, SQL, and data visualization, I excel in turning data into strategic insights. My academic foundation is reinforced by an ongoing Data Science certification, underscoring my expertise in predictive analytics and model development. Eager to merge technical skills with financial acumen, I am poised to contribute to the evolution of quantitative models in finance. My goal is to blend analytical rigor with practical applications, fostering data-driven decision-making in the financial world.
              </p>
            </div>
          </li>
          
        </ul>
      </div>
    </section>
  );
};
