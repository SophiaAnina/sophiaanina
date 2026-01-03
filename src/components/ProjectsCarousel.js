import React from 'react';
import styles from "@/styles/Home.module.css";

export default function ProjectsCarousel({ projects, currentProjectIndex, getSlideClass, getSkillColor, language, prevProject, nextProject, goToProject, isCarouselPaused, setIsCarouselPaused, onTouchStart, onTouchMove, onTouchEnd, t }) {
  return (
    <div className={styles.carouselContainer}>
      <div 
        className={styles.carousel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        style={{ touchAction: 'pan-y pinch-zoom' }}
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
  );
}
