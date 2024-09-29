import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import NavbarFlow from './components/Nav';
import './index.css';
import Game from './components/Game.jsx';

// Function to retrieve text from a specific page within a PDF Document
function getPageText(pageNum, PDFDocumentInstance) {
    return new Promise((resolve, reject) => {
        PDFDocumentInstance.getPage(pageNum).then(pdfPage => {
            pdfPage.getTextContent().then(textContent => {
                const textItems = textContent.items;
                let finalString = "";

                for (let i = 0; i < textItems.length; i++) {
                    finalString += textItems[i].str + " ";
                }

                resolve(finalString.trim());
            }).catch(reject);
        }).catch(reject);
    });
}

function Root() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedText, setExtractedText] = useState(''); // State to hold the extracted text

    return (
        <StrictMode>
            <NavbarFlow />
            {/* <Game /> */}
            <App />
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<Root />);