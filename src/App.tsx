import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import { formatXml } from './utils/xmlFormatter';
import { decryptXmlFile } from './services/api';
import { readEncryptedFile } from './services/fileReader';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      // Read the encrypted file
      const encryptedData = await readEncryptedFile(file);
      
      // Add pmcc and certificateId to the request
      const decryptRequest = {
        ...encryptedData,
        pmcc: "M06029517", // Default PMCC
        certificateId: ""   // Empty certificateId as per example
      };

      // Call the decryption API
      const decryptedXml = await decryptXmlFile(decryptRequest);
      
      // Format the XML content
      const xmlContent = formatXml(decryptedXml);

      // Create and download the file
      const xmlHeader = '<?xml version="1.0" encoding="utf-8"?>\n';
      const finalXmlContent = xmlHeader + xmlContent;
      
      const blob = new Blob([finalXmlContent], { 
        type: 'application/xml;charset=utf-8'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Extract original filename without extension and add .xml
      const baseFilename = file.name.replace(/\.[^/.]+$/, "");
      a.download = `${baseFilename}.xml`;
      
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '90%',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>XML File Decryptor</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Upload an encrypted XML file to decrypt and format</p>
        <FileUploader onFileUpload={handleFileUpload} />
        {isLoading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Converting your file...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
