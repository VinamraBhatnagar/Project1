import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StickerGallery } from './components/StickerGallery';
import { UploadForm } from './components/UploadForm';
import { AIGenerator } from './components/AIGenerator';
import { Sticker } from './types';
import { AdminLoginModal } from './components/AdminLoginModal';

const App: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>(() => {
    try {
      const savedStickers = localStorage.getItem('stickers');
      return savedStickers ? JSON.parse(savedStickers) : [
        // Initial example stickers if local storage is empty
        { id: '1', url: 'https://picsum.photos/seed/sticker1/200', name: 'Sample Sticker 1' },
        { id: '2', url: 'https://picsum.photos/seed/sticker2/200', name: 'Sample Sticker 2' },
        { id: '3', url: 'https://picsum.photos/seed/sticker3/200', name: 'Sample Sticker 3' }
      ];
    } catch (error) {
      console.error('Failed to parse stickers from localStorage', error);
      return [];
    }
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [backgroundClass, setBackgroundClass] = useState<string>('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('stickers', JSON.stringify(stickers));
  }, [stickers]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      // Morning
      setBackgroundClass('bg-gradient-to-br from-sky-300 via-blue-400 to-yellow-200');
    } else if (hour >= 12 && hour < 18) {
      // Afternoon
      setBackgroundClass('bg-gradient-to-br from-blue-400 to-sky-500');
    } else if (hour >= 18 && hour < 21) {
      // Evening
      setBackgroundClass('bg-gradient-to-br from-indigo-700 via-purple-800 to-orange-600');
    } else {
      // Night
      setBackgroundClass('bg-gradient-to-br from-gray-900 via-indigo-900 to-black');
    }
  }, []);

  const addSticker = (url: string, name: string) => {
    const newSticker: Sticker = {
      id: new Date().toISOString(),
      url,
      name,
    };
    setStickers(prev => [newSticker, ...prev]);
  };

  const deleteSticker = useCallback((id: string) => {
    if (!isAdmin) return;
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  }, [isAdmin]);

  const handleAdminLoginClick = () => {
    if (isAdmin) {
      setIsAdmin(false);
      alert("Admin mode deactivated.");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
    alert("Admin mode activated!");
  };

  return (
    <div className={`min-h-screen w-full ${backgroundClass} text-white transition-all duration-1000 font-sans`}>
      <Header onAdminLogin={handleAdminLoginClick} isAdmin={isAdmin} />

      {isLoginModalOpen && (
        <AdminLoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-center">Generate Sticker</h2>
            <AIGenerator onStickerGenerated={addSticker} />
            
            {isAdmin ? (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-center pt-8">Upload Sticker</h2>
                <UploadForm onStickerUploaded={addSticker} />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-center pt-8">Upload Your Sticker</h2>
                <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg text-center">
                  <p className="text-gray-300">
                    This feature is for admins only.
                  </p>
                  <p className="mt-2 text-sm text-gray-400">
                    Please click the admin icon in the top right to log in and upload your own stickers.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-center lg:text-left">Sticker Gallery</h2>
            <StickerGallery stickers={stickers} isAdmin={isAdmin} onDelete={deleteSticker} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-300/80">
        <p>StickerVerse AI &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
