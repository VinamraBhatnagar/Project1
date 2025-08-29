export interface Sticker {
  id: string;
  url: string;
  name: string;
}

export enum StickerStyle {
  CARTOON = 'Cartoon',
  REALISTIC = 'Realistic',
  ABSTRACT = 'Abstract',
  PIXEL_ART = 'Pixel Art',
  ANIME = 'Anime'
}

export enum StickerMood {
  HAPPY = 'Happy',
  SAD = 'Sad',
  EXCITED = 'Excited',
  ANGRY = 'Angry',
  SURPRISED = 'Surprised'
}
