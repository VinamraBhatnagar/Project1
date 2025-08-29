import React, { useState } from 'react';
import { generateSticker } from '../services/geminiService';
import { StickerStyle, StickerMood } from '../types';
import { SparklesIcon } from './icons';

interface AIGeneratorProps {
  onStickerGenerated: (url: string, name: string) => void;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onStickerGenerated }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<StickerStyle>(StickerStyle.CARTOON);
  const [mood, setMood] = useState<StickerMood>(StickerMood.HAPPY);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your sticker.');
      return;
    }
    setIsLoading(true);
    setError('');
    setGeneratedImage(null);

    const fullPrompt = `A high-quality, circular sticker with a distinct white border. The sticker should be in a ${style.toLowerCase()} style, featuring ${prompt}. The mood should be clearly ${mood.toLowerCase()}. The background should be transparent or simple to easily isolate the main subject.`;

    try {
      const imageUrl = await generateSticker(fullPrompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError('Failed to generate sticker. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (generatedImage) {
      onStickerGenerated(generatedImage, `AI: ${prompt}`);
      setGeneratedImage(null);
      setPrompt('');
    }
  };
  
  const handleDiscard = () => {
      setGeneratedImage(null);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg space-y-4">
      {generatedImage ? (
        <div className="space-y-4 text-center">
            <p className="font-semibold">Here's your new sticker!</p>
            <img src={generatedImage} alt="Generated sticker" className="rounded-lg mx-auto w-48 h-48 object-cover" />
            <div className="flex justify-center gap-4">
                <button onClick={handleSave} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save</button>
                <button onClick={handleDiscard} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Discard</button>
            </div>
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">Describe your sticker</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., a happy cat drinking coffee"
              className="w-full bg-white/10 rounded-lg p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none placeholder-gray-400"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="style" className="block text-sm font-medium mb-2">Style</label>
              <select id="style" value={style} onChange={(e) => setStyle(e.target.value as StickerStyle)} className="w-full bg-white/10 rounded-lg p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none">
                {Object.values(StickerStyle).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mood" className="block text-sm font-medium mb-2">Mood</label>
              <select id="mood" value={mood} onChange={(e) => setMood(e.target.value as StickerMood)} className="w-full bg-white/10 rounded-lg p-2 focus:ring-2 focus:ring-pink-500 focus:outline-none">
                {Object.values(StickerMood).map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
          
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                </>
            ) : (
                <>
                    <SparklesIcon className="w-5 h-5"/>
                    Generate with AI
                </>
            )}
          </button>
        </>
      )}
    </div>
  );
};
