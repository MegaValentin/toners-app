import React, { useState} from 'react';
import axios from 'axios';


const StockToner = ({ onTonerAdded, onClose }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsUploading(true);
        setUploadError(null);

        try {
            const response = await axios.post(`${apiUrl}/addalltoners`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onTonerAdded(response.data);
            // Cierra el modal
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error uploading file:', error);

            setUploadError('Failed to upload file.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center ">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            
            <div className="mb-4">
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50" 
              disabled={isUploading}
            >
              {isUploading ? 'Cargando...' : 'Cargar Excel'}
            </button>
            {uploadError && <p className="mt-4 text-red-600">{uploadError}</p>}
          </form>
        </div>
      );
}

export default StockToner;