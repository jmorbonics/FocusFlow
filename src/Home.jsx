import { useState } from "react";
// import { pdfjs } from 'pdfjs-dist/build/pdf'
// import * as PDFJS from "pdfjs-dist/build/pdf";
// import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// window.PDFJS = PDFJS;


const Home = () => {
  return (
    <div className="about-section">
      <h1>Our Project, FocusFlow</h1>
      <p>
        FocusFlow aims to enhance concentration and comprehension for individuals with trouble with concentration and with ADHD
        by integrating AI text extraction from PDFs with eye-tracking technology. 
        The ultimate study/focus application, this tool will highlight text dynamically, giving visual 
        cues to maintain focus and improve a user reading experience and concentration.
      </p>
      <h2>Features</h2>
      <p>
        - Trained eye tracking AI model remote hosted on the backend by an Intel AI PC<br />
        - Automatic Machine Learning backed highlighting system detecting missed highlights and autocorrecting features<br />
        - Custom made games created from using Artificial Intelligence to scrape users gaming history for trends<br />
        - Backed neural research showing increased attentiveness and focus given patterns of light and short times of stimulus activity
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions, suggestions, or need further information
        about our project, please don't hesitate to reach out. 
        <br /><br />
        @CS @MechSE @Illinois
        <br /><br />
        <span style={{ color: 'blue', fontSize: '40px' }}>I</span>
        <span style={{ color: 'orange', fontSize: '40px' }}>LL</span> - 
        <span style={{ color: 'blue', fontSize: '40px' }}>I</span>
        <span style={{ color: 'orange', fontSize: '40px' }}>N</span>
        <span style={{ color: 'blue', fontSize: '40px' }}>I</span>
      </p> 
    </div>
  );
};

export default Home;
