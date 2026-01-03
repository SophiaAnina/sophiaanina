import React from 'react';
import { LuImagePlay } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import styles from "@/styles/Home.module.css";

const specializationColors = [
  { color: "#F257A0", label: "Application Development" },
  { color: "#8313F2", label: "Web Development" },
  { color: "#675ABF", label: "UI/UX Design" },
  { color: "#1DF2F2", label: "SEO Optimization" },
  { color: "#675ABF", label: "Sustainable User Experience" },
];

export default function Header({ t, currentWordIndex, isAnimating }) {
  return (
    <div className={styles.Header}>
      <div className={styles.headerContent}>
        <h3>{t.title}</h3>
        <div className={styles.tabs}>
          <div className={styles.tab}><LuImagePlay /><p>{t.multimediaDesigner}</p></div>
          <div className={styles.tab}><FaCode style={{color:'aquamarine'}}/><p>{t.frontendDeveloper}</p></div>
        </div>
        <div>
          <h1 className={styles.title}>{t.mainTitle}</h1>
          <h1>
            {t.focusedOn}{" "}
            <span className={styles.focusWordContainer}>
              <span 
                className={`${styles.focusWord} ${isAnimating ? styles.focusWordExit : ''}`}
                style={{ color: specializationColors[currentWordIndex]?.color }}
              >
                {t.focusWords[currentWordIndex]}
              </span>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
