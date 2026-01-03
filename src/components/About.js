import React from 'react';
import styles from "@/styles/Home.module.css";

export default function About({ t }) {
  return (
    <div style={{ marginTop: '3rem' }}>
      <p className={styles.description}>
        {t.aboutDescription
          .split(t.frontendDevelopment)
          .map((part, index, array) => {
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
  );
}
