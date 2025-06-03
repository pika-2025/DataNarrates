import React from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".csv",
    multiple: false,
    onDrop: acceptedFiles => onFileUpload(acceptedFiles[0]),
  });

  return (
    <div 
      {...getRootProps()} 
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="upload-content">
        <svg className="upload-icon" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        <p>
          {isDragActive 
            ? "Drop CSV file here" 
            : "Drag & drop CSV file, or click to select"}
        </p>
      </div>
    </div>
  );
}
