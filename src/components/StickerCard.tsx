import React from 'react';
import { Sticker } from '../types';
import { DownloadIcon, TrashIcon } from './icons';

interface StickerCardProps {
  sticker: Sticker;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

export const StickerCard: React.FC<StickerCardProps> = ({ sticker, isAdmin, onDelete }) => {
  return (
    <div className="group relative aspect-square bg-black/20 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <img
        src={sticker.url}
        alt={sticker.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 p-2">
        <a
          href={sticker.url}
          download={`${sticker.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`}
          className="p-3 bg-blue-500/80 hover:bg-blue-600 rounded-full text-white transition-colors"
          title="Download Sticker"
        >
          <DownloadIcon className="w-5 h-5" />
        </a>
        {isAdmin && (
          <button
            onClick={() => onDelete(sticker.id)}
            className="p-3 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-colors"
            title="Delete Sticker"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
