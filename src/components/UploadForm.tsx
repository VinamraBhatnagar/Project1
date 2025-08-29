import React, { useState } from 'react';

interface UploadFormProps {
  onStickerUploaded: (url: string, name: string) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onStickerUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
        setError('File size must be less than 2MB.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onStickerUploaded(reader.result as string, file.name);
      setFile(null);
      (e.target as HTMLFormElement).reset();
    };
    reader.onerror = () => {
        setError('Failed to read file.');
    }
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg space-y-4">
      <div>
        <label htmlFor="sticker-upload" className="block text-sm font-medium mb-2">
          Choose Sticker (.png, .webp, .gif)
        </label>
        <input
          id="sticker-upload"
          type="file"
          accept="image/png, image/webp, image/gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-500 file:text-white hover:file:bg-violet-600"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {file && <p className="text-sm text-gray-300">Selected: {file.name}</p>}
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        disabled={!file}
      >
        Upload Sticker
      </button>
    </form>
  );
};
