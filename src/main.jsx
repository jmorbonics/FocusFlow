import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as pdfjsLib from 'pdfjs-dist/webpack'; // Import pdf.js
import App from './App.jsx';
import NavbarFlow from './Nav';
import './index.css';

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

    // Function to handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            extractTextFromPDF(file); // Call function to extract text
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    // Function to extract text from the PDF
    const extractTextFromPDF = async (file) => {
        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const typedArray = new Uint8Array(fileReader.result);
                const pdfDocument = await pdfjsLib.getDocument(typedArray).promise;

                const totalPages = pdfDocument.numPages;
                let allText = '';

                // Extract text from each page
                for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                    const text = await getPageText(pageNumber, pdfDocument);
                    allText += text + '\n'; // Append text from each page
                }

                setExtractedText(allText); // Set the extracted text to state
                console.log('Extracted text:', allText); // Check extracted text in console
            };
            fileReader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
        }
    };

    return (
        <StrictMode>
            <NavbarFlow />
            <div className="file-upload-container">
                {/* File input for PDF upload */}
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input" className="file-upload-button">
                    Upload PDF
                </label>
                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                {extractedText && (
                    <div className="pdf-text">
                        <h3>Extracted PDF Text:</h3>
                        <pre>{extractedText}</pre>
                    </div>
                )}
            </div>
            <App />
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<Root />);
