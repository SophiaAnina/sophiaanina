import React from 'react';
import styles from "@/styles/Home.module.css";

export default function ContactForm({ t, formRef, sendEmail, isSubmitting, submitStatus }) {
  return (
    <div id="contact" className={styles.contactSection}>
      <h2>{t.contact.title}</h2>
      <p className={styles.contactDescription}>
        {t.contact.description}
      </p>
      <form ref={formRef} onSubmit={sendEmail} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="user_name">{t.contact.form.name}</label>
          <input 
            type="text" 
            id="user_name"
            name="user_name" 
            required 
            className={styles.formInput}
            placeholder={t.contact.form.namePlaceholder}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="user_email">{t.contact.form.email}</label>
          <input 
            type="email" 
            id="user_email"
            name="user_email" 
            required 
            className={styles.formInput}
            placeholder={t.contact.form.emailPlaceholder}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="subject">{t.contact.form.subject}</label>
          <input 
            type="text" 
            id="subject"
            name="subject" 
            required 
            className={styles.formInput}
            placeholder={t.contact.form.subjectPlaceholder}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">{t.contact.form.message}</label>
          <textarea 
            id="message"
            name="message" 
            required 
            rows="6"
            className={styles.formTextarea}
            placeholder={t.contact.form.messagePlaceholder}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? t.contact.form.sending : t.contact.form.sendButton}
        </button>
        {submitStatus === 'success' && (
          <div className={styles.successMessage}>
            {t.contact.form.successMessage}
          </div>
        )}
        {submitStatus === 'error' && (
          <div className={styles.errorMessage}>
            {t.contact.form.errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}
