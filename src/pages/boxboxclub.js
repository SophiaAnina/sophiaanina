import styles from '@/styles/Home.module.css';

export default function BOXBOXCLUB() {
  return (
    <div className={styles.page}>
      <h1>Hovedopgaven: BoxBoxClub</h1>
      <p className={styles.description}>
        Se vores afsluttende hovedopgave for MUL C 2025 — en digital platform for kvindelige Formel 1-fans.
      </p>
      <iframe 
        src="/Hovedopgaven-maria-mikkel-sophia-gruppe-6-jrs.pdf" 
        width="100%" 
        height="800px" 
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
}
