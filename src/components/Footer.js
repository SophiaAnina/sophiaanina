import React from 'react';
import styles from "@/styles/Home.module.css";

export default function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <p>{t.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
      <a href="https://github.com/SophiaAnina" target="_blank" rel="noopener noreferrer">{t.footer.github}</a>
      <a href="https://www.linkedin.com/in/sophia-anina-kingston/" target="_blank" rel="noopener noreferrer">{t.footer.linkedin}</a>
      <a href="https://www.instagram.com/sophiaanina/" target="_blank" rel="noopener noreferrer">{t.footer.instagram}</a>
    </footer>
  );
}
