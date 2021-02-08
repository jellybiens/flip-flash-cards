import * as React from 'react';
import { Position, Scale } from '@types';

type State = { src: string; image: HTMLImageElement; position: Position; scale: Scale };
type Dispatch = {
  setSrc: (src: string) => void;
  setImage: (image: HTMLImageElement) => void;
  setPosition: ({ x, y }: Position) => void;
  setScale: ({ width, height }: Scale) => void;
  unSet: () => void;
};
type CropProviderProps = { children: React.ReactNode };

const CropStateContext = React.createContext<State | undefined>(undefined);
const CropDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const defaults = {
  src: undefined,
  image: null,
  position: {
    x: 0,
    y: 0,
  },
  scale: {
    height: undefined,
    width: undefined,
  },
};

const CroppingContextProvider: React.FC = ({ children }: CropProviderProps) => {
  const [src, setSrc] = React.useState<string>(defaults.src);
  const [image, setImage] = React.useState<HTMLImageElement>(defaults.image);
  const [position, setPosition] = React.useState<Position>(defaults.position);
  const [scale, setScale] = React.useState<Scale>(defaults.scale);

  const unSet = () => {
    setSrc(defaults.src);
    setImage(defaults.image);
    setPosition(defaults.position);
    setScale(defaults.scale);
  };

  const state = { src, image, position, scale };
  const dispatch = { setSrc, setImage, setPosition, setScale, unSet };

  return (
    <CropStateContext.Provider value={state}>
      <CropDispatchContext.Provider value={dispatch}>
        {children}
      </CropDispatchContext.Provider>
    </CropStateContext.Provider>
  );
};
function useCropState() {
  const context = React.useContext(CropStateContext);
  if (context === undefined) {
    throw new Error('useCropState must be used within a CropStateContext');
  }
  return context;
}
function useCropDispatch() {
  const context = React.useContext(CropDispatchContext);
  if (context === undefined) {
    throw new Error('useCropDispatch must be used within a CropDispatchContext');
  }
  return context;
}
export { CroppingContextProvider, useCropState, useCropDispatch };

export type ImageCropFieldArgs = {
  image: HTMLImageElement;
  position: Position;
  scale: Scale;
  px: number;
};

export const cropImageOnCanvas = async (
  image: HTMLImageElement,
  position: Position,
  scale: Scale,
  px: number,
): Promise<string> => {
  const { x, y } = position;
  const { width, height } = scale;

  const [nWidth, nHeight] = [image.naturalWidth, image.naturalHeight];
  const ratio = Math.min(nWidth, nHeight) / Math.min(width, height);
  const d = px * ratio;
  const [posX, posY] = [-x * ratio, -y * ratio];

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = px;
  canvas.height = px;

  ctx.drawImage(image, posX, posY, d, d, 0, 0, px, px);

  return new Promise<string>((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/png');
  });
};
