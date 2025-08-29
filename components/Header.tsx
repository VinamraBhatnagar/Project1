
import React from 'react';
import { AdminIcon } from './icons';

interface HeaderProps {
    onAdminLogin: () => void;
    isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onAdminLogin, isAdmin }) => {
    return (
        <header className="bg-black/20 backdrop-blur-md sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                    StickerVerse AI
                </h1>
                <button
                    onClick={onAdminLogin}
                    className={`p-2 rounded-full transition-colors duration-300 ${isAdmin ? 'bg-green-500/80 hover:bg-green-600' : 'bg-white/20 hover:bg-white/30'}`}
                    title={isAdmin ? "Logout Admin" : "Admin Login"}
                >
                    <AdminIcon className="w-6 h-6 text-white"/>
                </button>
            </div>
        </header>
    );
};
