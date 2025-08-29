
import React from 'react';
import { Sticker } from '../types';
import { StickerCard } from './StickerCard';

interface StickerGalleryProps {
  stickers: Sticker[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

export const StickerGallery: React.FC<StickerGalleryProps> = ({ stickers, isAdmin, onDelete }) => {
  if (stickers.length === 0) {
    return (
      <div className="text-center p-10 bg-white/10 rounded-lg">
        <p className="text-xl text-gray-300">No stickers yet. Generate or upload one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {stickers.map(sticker => (
        <StickerCard
          key={sticker.id}
          sticker={sticker}
          isAdmin={isAdmin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
