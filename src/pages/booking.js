import Head from "next/head";
import { useState, useRef } from "react";
import styles from "@/styles/Booking.module.css";
import emailjs from '@emailjs/browser';
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone, FaServicestack } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import Link from 'next/link';

// Translation object for booking page
const translations = {
  en: {
    title: "Book a Service",
    description: "Schedule a consultation or book a service with Sophia Anina Kingston",
    backToHome: "Back to Home",
    pageTitle: "Book Your Service or Consultation",
    pageSubtitle: "Let's discuss your project and create something amazing together",
    form: {
      serviceType: "Service Type",
      selectService: "Select a service...",
      services: {
        webDev: "Web Development",
        appDev: "App Development", 
        uiuxDesign: "UI/UX Design",
        seoOptimization: "SEO Optimization",
        graphicDesign: "Graphic Design",
        consultation: "General Consultation"
      },
      personalInfo: "Personal Information",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number (Optional)",
      scheduleInfo: "Schedule Information",
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time",
      timeSlots: {
        morning: "Morning (9:00 - 12:00)",
        afternoon: "Afternoon (13:00 - 17:00)",
        evening: "Evening (18:00 - 21:00)"
      },
      projectDetails: "Project Details",
      projectDescription: "Tell me about your project...",
      budget: "Estimated Budget (DKK)",
      budgetOptions: {
        small: "5,000 - 15,000 DKK",
        medium: "15,000 - 50,000 DKK", 
        large: "50,000+ DKK",
        consultation: "Consultation only"
      },
      timeline: "Project Timeline",
      timelineOptions: {
        urgent: "ASAP (Rush fee may apply)",
        month: "Within 1 month",
        quarter: "1-3 months",
        flexible: "Flexible"
      },
      submit: "Book Service",
      submitting: "Booking...",
      required: "Required field"
    },
    success: "Your booking request has been sent successfully! I'll get back to you within 24 hours.",
    error: "There was an error sending your request. Please try again or contact me directly."
  },
  da: {
    title: "Book en Service",
    description: "Bestil en konsultation eller book en service med Sophia Anina Kingston",
    backToHome: "Tilbage til Hjem",
    pageTitle: "Book Din Service eller Konsultation",
    pageSubtitle: "Lad os diskutere dit projekt og skabe noget fantastisk sammen",
    form: {
      serviceType: "Service Type",
      selectService: "Vælg en service...",
      services: {
        webDev: "Webudvikling",
        appDev: "App Udvikling", 
        uiuxDesign: "UI/UX Design",
        seoOptimization: "SEO Optimering",
        graphicDesign: "Grafisk Design",
        consultation: "Generel Konsultation"
      },
      personalInfo: "Personlige Oplysninger",
      firstName: "Fornavn",
      lastName: "Efternavn",
      email: "Email Adresse",
      phone: "Telefonnummer (Valgfrit)",
      scheduleInfo: "Tidsplan Information",
      preferredDate: "Foretrukken Dato",
      preferredTime: "Foretrukken Tid",
      timeSlots: {
        morning: "Morgen (9:00 - 12:00)",
        afternoon: "Eftermiddag (13:00 - 17:00)",
        evening: "Aften (18:00 - 21:00)"
      },
      projectDetails: "Projekt Detaljer",
      projectDescription: "Fortæl mig om dit projekt...",
      budget: "Estimeret Budget (DKK)",
      budgetOptions: {
        small: "5.000 - 15.000 DKK",
        medium: "15.000 - 50.000 DKK", 
        large: "50.000+ DKK",
        consultation: "Kun konsultation"
      },
      timeline: "Projekt Tidsramme",
      timelineOptions: {
        urgent: "Hurtigst muligt (Hastegebyr kan gælde)",
        month: "Inden for 1 måned",
        quarter: "1-3 måneder",
        flexible: "Fleksibel"
      },
      submit: "Book Service",
      submitting: "Booker...",
      required: "Påkrævet felt"
    },
    success: "Din booking anmodning er sendt med succes! Jeg vender tilbage inden for 24 timer.",
    error: "Der var en fejl ved afsendelse af din anmodning. Prøv igen eller kontakt mig direkte."
  }
};

export default function Booking() {
  const [language, setLanguage] = useState('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const formRef = useRef();
  
  const [formData, setFormData] = useState({
    serviceType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    projectDescription: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState({});
  const t = translations[language];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.serviceType) newErrors.serviceType = t.form.required;
    if (!formData.firstName) newErrors.firstName = t.form.required;
    if (!formData.lastName) newErrors.lastName = t.form.required;
    if (!formData.email) newErrors.email = t.form.required;
    if (!formData.preferredDate) newErrors.preferredDate = t.form.required;
    if (!formData.preferredTime) newErrors.preferredTime = t.form.required;
    if (!formData.projectDescription) newErrors.projectDescription = t.form.required;
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage({ type: '', content: '' });

    try {
      const templateParams = {
        to_name: "Sophia",
        from_name: `${formData.firstName} ${formData.lastName}`,
        service_type: formData.serviceType,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        project_description: formData.projectDescription,
        budget: formData.budget || 'Not specified',
        timeline: formData.timeline || 'Not specified',
        message: `New booking request for ${formData.serviceType}. 
                 Contact: ${formData.email} ${formData.phone ? '/ ' + formData.phone : ''}
                 Preferred meeting: ${formData.preferredDate} at ${formData.preferredTime}
                 Budget: ${formData.budget || 'Not specified'}
                 Timeline: ${formData.timeline || 'Not specified'}
                 
                 Project Description:
                 ${formData.projectDescription}`
      };

      // Replace with your EmailJS configuration
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setMessage({ type: 'success', content: t.success });
      setFormData({
        serviceType: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        projectDescription: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Booking submission error:', error);
      setMessage({ type: 'error', content: t.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <main className={styles.main}>
          {/* Header with back button and language toggle */}
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
              <IoMdArrowBack />
              {t.backToHome}
            </Link>
            
            <div className={styles.languageToggle}>
              <button 
                onClick={() => setLanguage('en')} 
                className={language === 'en' ? styles.active : ''}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('da')} 
                className={language === 'da' ? styles.active : ''}
              >
                DA
              </button>
            </div>
          </div>

          {/* Page Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
            <p className={styles.pageSubtitle}>{t.pageSubtitle}</p>
          </div>

          {/* Booking Form */}
          <form ref={formRef} onSubmit={handleSubmit} className={styles.bookingForm}>
            
            {/* Service Selection */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FaServicestack /> {t.form.serviceType}
              </h2>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className={`${styles.select} ${errors.serviceType ? styles.error : ''}`}
              >
                <option value="">{t.form.selectService}</option>
                <option value={t.form.services.webDev}>{t.form.services.webDev}</option>
                <option value={t.form.services.appDev}>{t.form.services.appDev}</option>
                <option value={t.form.services.uiuxDesign}>{t.form.services.uiuxDesign}</option>
                <option value={t.form.services.seoOptimization}>{t.form.services.seoOptimization}</option>
                <option value={t.form.services.graphicDesign}>{t.form.services.graphicDesign}</option>
                <option value={t.form.services.consultation}>{t.form.services.consultation}</option>
              </select>
              {errors.serviceType && <span className={styles.errorText}>{errors.serviceType}</span>}
            </div>

            {/* Personal Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FaUser /> {t.form.personalInfo}
              </h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder={t.form.firstName}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`${styles.input} ${errors.firstName ? styles.error : ''}`}
                  />
                  {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder={t.form.lastName}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`${styles.input} ${errors.lastName ? styles.error : ''}`}
                  />
                  {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    placeholder={t.form.email}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`${styles.input} ${errors.email ? styles.error : ''}`}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    placeholder={t.form.phone}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>
                <FaCalendar /> {t.form.scheduleInfo}
              </h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type="date"
                    min={minDate}
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                    className={`${styles.input} ${errors.preferredDate ? styles.error : ''}`}
                  />
                  {errors.preferredDate && <span className={styles.errorText}>{errors.preferredDate}</span>}
                </div>
                <div className={styles.formGroup}>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className={`${styles.select} ${errors.preferredTime ? styles.error : ''}`}
                  >
                    <option value="">{t.form.preferredTime}</option>
                    <option value={t.form.timeSlots.morning}>{t.form.timeSlots.morning}</option>
                    <option value={t.form.timeSlots.afternoon}>{t.form.timeSlots.afternoon}</option>
                    <option value={t.form.timeSlots.evening}>{t.form.timeSlots.evening}</option>
                  </select>
                  {errors.preferredTime && <span className={styles.errorText}>{errors.preferredTime}</span>}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>{t.form.projectDetails}</h2>
              <textarea
                placeholder={t.form.projectDescription}
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                rows={5}
                className={`${styles.textarea} ${errors.projectDescription ? styles.error : ''}`}
              />
              {errors.projectDescription && <span className={styles.errorText}>{errors.projectDescription}</span>}
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className={styles.select}
                  >
                    <option value="">{t.form.budget}</option>
                    <option value={t.form.budgetOptions.small}>{t.form.budgetOptions.small}</option>
                    <option value={t.form.budgetOptions.medium}>{t.form.budgetOptions.medium}</option>
                    <option value={t.form.budgetOptions.large}>{t.form.budgetOptions.large}</option>
                    <option value={t.form.budgetOptions.consultation}>{t.form.budgetOptions.consultation}</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className={styles.select}
                  >
                    <option value="">{t.form.timeline}</option>
                    <option value={t.form.timelineOptions.urgent}>{t.form.timelineOptions.urgent}</option>
                    <option value={t.form.timelineOptions.month}>{t.form.timelineOptions.month}</option>
                    <option value={t.form.timelineOptions.quarter}>{t.form.timelineOptions.quarter}</option>
                    <option value={t.form.timelineOptions.flexible}>{t.form.timelineOptions.flexible}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
            </button>

            {/* Success/Error Message */}
            {message.content && (
              <div className={`${styles.message} ${styles[message.type]}`}>
                {message.content}
              </div>
            )}
          </form>
        </main>
      </div>
    </>
  );
}