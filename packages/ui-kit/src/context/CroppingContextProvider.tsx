import * as React from 'react';

export type Position = { x: number; y: number };
export type Scale = { width: number; height: number };

type State = { image: HTMLImageElement; position: Position; scale: Scale };
type Dispatch = {
  setImage: (image: HTMLImageElement) => void;
  setPosition: ({ x, y }: Position) => void;
  setScale: ({ width, height }: Scale) => void;
};
type CropProviderProps = { children: React.ReactNode };

const CropStateContext = React.createContext<State | undefined>(undefined);
const CropDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const CroppingContextProvider: React.FC = ({ children }: CropProviderProps) => {
  const [image, setImage] = React.useState<HTMLImageElement>(null);
  const [position, setPosition] = React.useState<Position>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = React.useState<Scale>({
    height: undefined,
    width: undefined,
  });

  const state = { image, position, scale };
  const dispatch = { setImage, setPosition, setScale };

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
