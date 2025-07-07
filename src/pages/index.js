import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { League_Gothic } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { FaCode } from "react-icons/fa6";
import { LuImagePlay } from "react-icons/lu";
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Mobile.json';
import emailjs from '@emailjs/browser';

// Translation object
const translations = {
  en: {
    title: "Sophia Anina Kingston",
    description: "Sophia Anina Kingston's Portfolio",
    multimediaDesigner: "Multimedia Designer",
    frontendDeveloper: "Frontend Developer",
    mainTitle: "Hyperfocused Frontend Developer",
    focusedOn: "Focused on",
    focusWords: [
      "Application Development",
      "Web Development",
      "UI/UX Design",
      "SEO Optimization",
      "Sustainable User Experience",
    ],
    aboutDescription: "I am a recently graduated Multimedia designer with a specialization in frontend development from CPH-Business in Copenhagen, Denmark. As a frontend developer, my focus is primarily on app development and web development using Angular and React and supabase for backend. As a multimedia designer, my expertise also includes experience with UX/UI design and content creation using Adobe Illustrator, Adobe Photoshop, Adobe After Effects, Adobe InDesign, Figma, Canva, Webflow, and WordPress.",
    frontendDevelopment: "frontend development",
    uxui: "UX/UI",
    contentCreation: "content creation",
    featuredProjects: "Featured Projects",
    skills: {
      categories: {
        frontendDevelopment: "Frontend Development",
        uiuxDesign: "UI/UX Design",
        contentCreation: "Content Creation"
      },
      ux: [
        "Search Engine Optimization",
        "User Experience Design",
        "Sustainable UX",
        "Web Accessibility",
        "Responsive Design",
        "Figma",
      ]
    },
    projects: [
      {
        title: "BOX BOX CLUB",
        description: "A platform for fans of Formula 1 to connect and share their passion. Including a forum with a community board for friendly discussion restricting words of discrimination. Including a learning platform with quizzes to test their knowledge and a article board for news and updates to expand it.",
        imageAlt: "Box Box Club Project",
        links: [
          { label: "Figma Prototype" },
          { label: "Github" },
          { label: "Moodboard" },
          { label: "Report" }
        ]
      },
      {
        title: "Kingston Consulting",
        description: "I redesigned and developed a previous website Kingston Consulting for Business Psychologist Marie Kingston. The website is made using the CMS platform DanDomain. The redesign consisted of a new layout and a new color palette and a general structuring of the UX.",
        imageAlt: "Kingston Consulting Project",
        links: [
          { label: "Figma Prototype" },
          { label: "Website" }
        ]
      },
      {
        title: "CPHD Website Redesign",
        description: "During my internship at CPHD, I helped develop the redesign CPHD's own website. The website is made using the CMS platform Wordpress using the theme Divi. The redesign consisted of a new layout and a new color palette and a general structuring of the UX.",
        imageAlt: "CPHD Frontpage Project",
        links: [
          { label: "Figma Prototype" },
          { label: "Github" },
          { label: "Moodboard" },
          { label: "Report" }
        ]
      }
    ],
    contact: {
      title: "Get In Touch",
      description: "Have a project in mind or just want to say hello? I'd love to hear from you!",
      form: {
        name: "Name",
        namePlaceholder: "Your full name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project inquiry, collaboration, etc.",
        message: "Message",
        messagePlaceholder: "Tell me about your project or just say hello...",
        sendButton: "Send Message",
        sending: "Sending...",
        successMessage: "✅ Message sent successfully! I'll get back to you soon.",
        errorMessage: "❌ Something went wrong. Please try again or email me directly."
      }
    },
    footer: {
      copyright: "© {year} My Portfolio. All rights reserved.",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram"
    },
    navigation: {
      previousProject: "Previous project",
      nextProject: "Next project",
      goToProject: "Go to project {number}"
    }
  },
  da: {
    title: "Sophia Anina Kingston",
    description: "Sophia Anina Kingstons Portfolio",
    multimediaDesigner: "Multimediedesigner",
    frontendDeveloper: "Frontend Udvikler",
    mainTitle: "Hyperfokuseret Frontend Udvikler",
    focusedOn: "Fokuseret på",
    focusWords: [
      "Applikationsudvikling",
      "Webudvikling",
      "UI/UX Design",
      "SEO Optimering",
      "Bæredygtig Brugeroplevelse",
    ],
    aboutDescription: "Jeg er en nyuddannet multimediedesigner med specialisering i frontend udvikling fra CPH-Business i København, Danmark. Som frontend udvikler er mit fokus primært på app udvikling og webudvikling ved brug af Angular og React og supabase til backend. Som multimediedesigner inkluderer min ekspertise også erfaring med UX/UI design og indholdsproduktion ved brug af Adobe Illustrator, Adobe Photoshop, Adobe After Effects, Adobe InDesign, Figma, Canva, Webflow og WordPress.",
    frontendDevelopment: "frontend udvikling",
    uxui: "UX/UI",
    contentCreation: "indholdsproduktion",
    featuredProjects: "Fremhævede Projekter",
    skills: {
      categories: {
        frontendDevelopment: "Frontend Udvikling",
        uiuxDesign: "UI/UX Design",
        contentCreation: "Indholdsproduktion"
      },
      ux: [
        "Søgemaskineoptimering",
        "Brugeroplevelse Design",
        "Bæredygtig UX",
        "Web Tilgængelighed",
        "Responsivt Design",
        "Figma",
      ]
    },
    projects: [
      {
        title: "BOX BOX CLUB",
        description: "En platform for fans af Formel 1 til at forbinde og dele deres passion. Inkluderer et forum med et fællesskabstavle til venlig diskussion der begrænser diskriminerende ord. Inkluderer en læringsplatform med quizzer til at teste deres viden og en artikeltavle for nyheder og opdateringer for at udvide det.",
        imageAlt: "Box Box Club Projekt",
        links: [
          { label: "Figma Prototype" },
          { label: "Github" },
          { label: "Moodboard" },
          { label: "Rapport" }
        ]
      },
      {
        title: "Kingston Consulting",
        description: "Jeg redesignede og udviklede en tidligere hjemmeside Kingston Consulting for erhvervspsykolog Marie Kingston. Hjemmesiden er lavet ved brug af CMS platformen DanDomain. Redesignet bestod af et nyt layout og en ny farvepalet og en generel strukturering af UX.",
        imageAlt: "Kingston Consulting Projekt",
        links: [
          { label: "Figma Prototype" },
          { label: "Hjemmeside" }
        ]
      },
      {
        title: "CPHD Hjemmeside Redesign",
        description: "Under mit praktikophold hos CPHD hjalp jeg med at udvikle redesignet af CPHD's egen hjemmeside. Hjemmesiden er lavet ved brug af CMS platformen Wordpress med temaet Divi. Redesignet bestod af et nyt layout og en ny farvepalet og en generel strukturering af UX.",
        imageAlt: "CPHD Forside Projekt",
        links: [
          { label: "Figma Prototype" },
          { label: "Github" },
          { label: "Moodboard" },
          { label: "Rapport" }
        ]
      }
    ],
    contact: {
      title: "Kom I Kontakt",
      description: "Har du et projekt i tankerne eller vil du bare sige hej? Jeg vil gerne høre fra dig!",
      form: {
        name: "Navn",
        namePlaceholder: "Dit fulde navn",
        email: "Email",
        emailPlaceholder: "din.email@eksempel.com",
        subject: "Emne",
        subjectPlaceholder: "Projektforespørgsel, samarbejde, osv.",
        message: "Besked",
        messagePlaceholder: "Fortæl mig om dit projekt eller sig bare hej...",
        sendButton: "Send Besked",
        sending: "Sender...",
        successMessage: "✅ Besked sendt med succes! Jeg vender tilbage til dig snart.",
        errorMessage: "❌ Noget gik galt. Prøv venligst igen eller email mig direkte."
      }
    },
    footer: {
      copyright: "© {year} Mit Portfolio. Alle rettigheder forbeholdes.",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram"
    },
    navigation: {
      previousProject: "Forrige projekt",
      nextProject: "Næste projekt",
      goToProject: "Gå til projekt {number}"
    }
  }
};

const LottieAnimation = () => {
  return (
    <div className={styles.lottieContainer}>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ 
          width: 'fit-content', 
          height: 'fit-content',
        }}
      />
    </div>
  );
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Technical skills arrays (these remain in English as they are technical terms)
const FrontendWords = [
  "Angular",
  "React",
  "React Native",
  "Tailwind CSS",
  "Bootstrap",
  "Supabase",
]

const UXWords = [
 "Search Engine Optimization",
 "User Experience Design",
 "Sustainable UX",
  "Web Accessibility",
  "Responsive Design",
   "Figma",
];

const ContentWords = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe After Effects",
  "Adobe Indesign",
  "Canva",
  "Webflow",
  "WordPress",
  "DanDomain",
  "PHP",
] 

// Skill categories function that uses current language
const getSkillCategories = (language) => [
  {
    category: translations[language].skills.categories.frontendDevelopment,
    color: "#8313F2", // Purple
    skills: FrontendWords
  },
  {
    category: translations[language].skills.categories.uiuxDesign, 
    color: "#675ABF",
    skills: UXWords
  },
  {
    category: translations[language].skills.categories.contentCreation,
    color: "#4682B4",
    skills: ContentWords
  }
];

// Function to get color for a specific skill
const getSkillColor = (skillName, language) => {
  const skillCategories = getSkillCategories(language);
  for (const category of skillCategories) {
    if (category.skills.includes(skillName)) {
      return category.color;
    }
  }
  return "var(--gray-alpha-200)"; // Default color if skill not found
};

// Specialization colors
const specializationColors =[
  { color: "#F257A0", label: "Application Development" },
  { color: "#8313F2", label: "Web Development" },
  { color: "#675ABF", label: "UI/UX Design" },
  { color: "#1DF2F2", label: "SEO Optimization" },
  { color: "#675ABF", label: "Sustainable User Experience" },
]

// Projects data function that uses current language
const getProjectsData = (language) => [
  {
    id: 1,
    title: translations[language].projects[0].title,
    description: translations[language].projects[0].description,
    tags: ["React Native", "Supabase", "Figma", "Adobe Illustrator"],
    links: [
      { label: translations[language].projects[0].links[0].label, url: "https://www.figma.com/design/pVm2ml1O4BTL3gswSNL59W/Hovedopgave---Prototype?node-id=1-4&p=f&t=C6RqElfTsK3yFjwg-0" },
      { label: translations[language].projects[0].links[1].label, url: "https://github.com/SophiaAnina/BOXBOXCLUB" },
      { label: translations[language].projects[0].links[2].label, url: "https://miro.com/app/board/uXjVIGXeqPM=/" },
      { label: translations[language].projects[0].links[3].label, url: "/Hovedopgaven-maria-mikkel-sophia-gruppe-6-jrs.pdf", download: "BOX_BOX_CLUB_Rapport.pdf" }
    ],
    image: "/mobil.png",
    imageAlt: translations[language].projects[0].imageAlt,
    layout: "mobile"
  },
  {
    id: 2,
    title: translations[language].projects[1].title,
    description: translations[language].projects[1].description,
    tags: ["DanDomain", "Figma"],
    links: [
      { label: translations[language].projects[1].links[0].label, url: "https://www.figma.com/design/pVm2ml1O4BTL3gswSNL59W/Hovedopgave---Prototype?node-id=1-4&p=f&t=C6RqElfTsK3yFjwg-0" },
      { label: translations[language].projects[1].links[1].label, url: "https://kingston-consulting.dk/" }
    ],
    image: "/KingstonConsulting.jpg",
    imageAlt: translations[language].projects[1].imageAlt,
    layout: "desktop"
  },
  {
    id: 3,
    title: translations[language].projects[2].title,
    description: translations[language].projects[2].description,
    tags: ["WordPress", "PHP", "Tailwind CSS"],
    links: [
      { label: translations[language].projects[2].links[0].label, url: "https://www.figma.com/design/pVm2ml1O4BTL3gswSNL59W/Hovedopgave---Prototype?node-id=1-4&p=f&t=C6RqElfTsK3yFjwg-0" },
      { label: translations[language].projects[2].links[1].label, url: "https://github.com/SophiaAnina/BOXBOXCLUB" },
      { label: translations[language].projects[2].links[2].label, url: "https://miro.com/app/board/uXjVIGXeqPM=/" },
      { label: translations[language].projects[2].links[3].label, url: "/Hovedopgaven-maria-mikkel-sophia-gruppe-6-jrs.pdf", download: "BOX_BOX_CLUB_Rapport.pdf" }
    ],
    image: "/CPHD-Frontpage.jpeg",
    imageAlt: translations[language].projects[2].imageAlt,
    layout: "desktop"
  }
];

export default function Home() {
  // Language state
  const [language, setLanguage] = useState('en');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [randomizedSkills, setRandomizedSkills] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  
  // Contact form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const formRef = useRef();

  // Get current translations
  const t = translations[language];
  // Get current projects data
  const projects = getProjectsData(language);

  // Language toggle function
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'da' : 'en');
  };

  // Helper function to get slide class based on position relative to current
  const getSlideClass = (index, currentIndex, totalSlides) => {
    if (index === currentIndex) {
      return `${styles.carouselSlide} ${styles.activeSlide}`;
    }
    
    // Calculate previous and next indices with wrapping
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;
    
    if (index === prevIndex) {
      return `${styles.carouselSlide} ${styles.prevSlide}`;
    } else if (index === nextIndex) {
      return `${styles.carouselSlide} ${styles.nextSlide}`;
    }
    
    return styles.carouselSlide;
  };

  // Carousel navigation functions
  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentProjectIndex(index);
  };

  // Contact form submit handler
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Replace these with your actual EmailJS credentials
    const SERVICE_ID = 'service_slqz4rf';
    const TEMPLATE_ID = 'template_ud1rrsj'; // Replace with your template ID
    const PUBLIC_KEY = '7QAtG1ljo3IO4ofVi';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSubmitStatus('success');
          setIsSubmitting(false);
          formRef.current.reset(); // Clear the form
        },
        (error) => {
          console.log('FAILED...', error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
        },
      );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevProject();
      } else if (event.key === 'ArrowRight') {
        nextProject();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      prevProject();
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (isCarouselPaused) return;
    
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isCarouselPaused]); // Remove currentProjectIndex from dependencies to prevent restart on every slide change

  // Create randomized skills array on component mount
  useEffect(() => {
    const skillCategories = getSkillCategories(language);
    const allSkillsWithCategories = [];
    
    skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        allSkillsWithCategories.push({
          skill: skill,
          category: category.category
        });
      });
    });
    
    // Shuffle the array using Fisher-Yates algorithm
    const shuffled = [...allSkillsWithCategories];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setRandomizedSkills(shuffled);
  }, [language]); // Re-run when language changes

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => 
          (prevIndex + 1) % t.focusWords.length
        );
        setIsAnimating(false);
      }, 400); // Exit animation duration
    }, 4000); // 4 seconds interval for better pacing

    return () => clearInterval(interval);
  }, [t.focusWords.length]); // Re-run when language changes

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
        {/* Language Toggle Button */}
        <div className={styles.languageToggle}>
          <button 
            onClick={toggleLanguage}
            className={styles.languageButton}
            aria-label={`Switch to ${language === 'en' ? 'Danish' : 'English'}`}
          >
            {language === 'en' ? '🇩🇰 DA' : '🇬🇧 EN'}
          </button>
        </div>

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
          
          {/* Skills Display - All Skills Mixed and Randomized */}
          
          <div style={{ marginTop: '3rem' }}>
          <p className={styles.description}>
            {t.aboutDescription
              .split(t.frontendDevelopment)
              .map((part, index, array) => {
                // Process each part for UX/UI and content creation highlighting
                const processedPart = part
                  .split(new RegExp(`(\\b${t.uxui}\\b)`, 'g'))
                  .map((segment, i) => 
                    segment === t.uxui ? 
                      <span key={`uxui-${index}-${i}`} style={{color: '#675ABF'}}>{segment}</span> : 
                      segment.split(new RegExp(`(\\b${t.contentCreation}\\b)`, 'g'))
                        .map((subSegment, j) => 
                          subSegment === t.contentCreation ? 
                            <span key={`content-${index}-${i}-${j}`} style={{color: '#4682B4'}}>{subSegment}</span> : 
                            subSegment
                        )
                  )
                  .flat();

                return (
                  <React.Fragment key={index}>
                    {processedPart}
                    {index < array.length - 1 && (
                      <span style={{color:'aquamarine'}}>{t.frontendDevelopment}</span>
                    )}
                  </React.Fragment>
                );
              })}
          </p>
           
          </div>
        </div>
        </div>       
          <LottieAnimation />   
       </div>
          <h1 className={styles.featuredProjects}>{t.featuredProjects}</h1>  
          <div className={styles.carouselContainer}>
            <div 
              className={styles.carousel}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              <div className={styles.carouselTrack}>
                {projects.map((project, index) => (
                  <div 
                    key={project.id}
                    className={getSlideClass(index, currentProjectIndex, projects.length)}
                  >
                    <div className={project.layout === 'mobile' ? styles.project : styles.Computer}>
                      <img src={project.image} alt={project.imageAlt} className={styles.projectImage} />
                      <div className={styles.projectContent}>
                        <h3>{project.title}</h3>
                        <p className={styles.projectDescription}>{project.description}</p>
                        <div className={styles.projectTags}>
                          {project.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} style={{backgroundColor: getSkillColor(tag, language)}}>
                              <p>{tag}</p>
                            </div>
                          ))}
                        </div>
                        <div className={styles.projectLinks}>
                          {project.links.map((link, linkIndex) => (
                            <a 
                              key={linkIndex}
                              href={link.url} 
                              className={styles.projectLink}
                              {...(link.download && { download: link.download })}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className={styles.carouselNav}>
              <button 
                onClick={prevProject} 
                className={styles.navButton}
                aria-label={t.navigation.previousProject}
                style={{marginRight: 'auto'}}
              >
                ←
              </button>
              
              {/* Dots indicator */}
            
              
              <button 
                onClick={nextProject} 
                className={styles.navButton}
                aria-label={t.navigation.nextProject}
                style={{marginLeft: 'auto'}}
              >
                →
              </button>
            </div>
              <div className={styles.carouselDots}>
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`${styles.dot} ${index === currentProjectIndex ? styles.activeDot : ''}`}
                    aria-label={t.navigation.goToProject.replace('{number}', index + 1)}
                  />
                ))}
              </div>
          </div>
          
          {/* Contact Form Section */}
          <div className={styles.contactSection}>
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
           <footer className={styles.footer}>
         
            <p>{t.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
            <a href="https://github.com/SophiaAnina" target="_blank" rel="noopener noreferrer">{t.footer.github}</a>
            <a href="https://www.linkedin.com/in/sophia-anina-kingston/" target="_blank" rel="noopener noreferrer">{t.footer.linkedin}</a>
            <a href="https://www.instagram.com/sophiaanina/" target="_blank" rel="noopener noreferrer">{t.footer.instagram}</a>
           
         
        </footer>
        </main>
       
      </div>
    </>
  );
}
