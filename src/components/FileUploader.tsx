import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/xml': ['.xml']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''}`}
      style={{
        border: '2px dashed #cccccc',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f8ff' : '#ffffff',
        transition: 'all 0.2s ease-in-out',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <input {...getInputProps()} />
      <div style={{ pointerEvents: 'none' }}>
        {isDragActive ? (
          <div>
            <p style={{ fontSize: '1.2rem', color: '#2196f3', marginBottom: '0.5rem' }}>Drop the JSON file here...</p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Release to upload</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: '0.5rem' }}>
              Drag and drop a JSON file here
            </p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              or click to select a file
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;