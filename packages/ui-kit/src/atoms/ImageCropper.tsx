import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Draggable from 'react-draggable';

const useStyles = makeStyles(() => ({
  root: { overflow: 'hidden', outline: 'solid 1px black' },
}));

type Position = { x: number; y: number };
type Scale = { width: number; height: number };

type ImageCropperProps = {
  image: HTMLImageElement;
  position: Position;
  setPosition: (p: Position) => void;
  scale: Scale;
  setScale: (s: Scale) => void;
  zoom: number;
  px?: number;
};

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  position,
  setPosition,
  scale,
  setScale,
  zoom = 1,
  px = 300,
}) => {
  const cs = useStyles();
  const [bounds, setBounds] = React.useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }>(null);

  const positionImage = () => {
    let [width, height] = [0, 0];
    if (image.width < image.height) {
      const factor = image.width / px;
      width = (image.width = px) * zoom;
      height = (image.height /= factor) * zoom;
    } else {
      const factor = image.height / px;
      width = (image.width /= factor) * zoom;
      height = (image.height = px) * zoom;
    }

    const scalePosition = (() => {
      let pos = { ...position };
      const half = px / 2;
      const [centreX, centreY] = [-pos.x + half, -pos.y + half];
      const [newCentreX, newCentreY] =
        scale.width < width
          ? [centreX * (1 + 0.05 / zoom), centreY * (1 + 0.05 / zoom)]
          : [centreX / (1 + 0.05 / zoom), centreY / (1 + 0.05 / zoom)];
      const [offSetX, offSetY] = [newCentreX - half, newCentreY - half];

      pos = {
        x: -offSetX,
        y: -offSetY,
      };

      if (px - width > pos.x) {
        pos = {
          x: px - width,
          y: pos.y,
        };
      }
      if (px - height > pos.y) {
        pos = {
          x: pos.x,
          y: px - height,
        };
      }
      if (pos.x > 0) {
        pos = {
          x: 0,
          y: pos.y,
        };
      }
      if (pos.y > 0) {
        pos = {
          x: pos.x,
          y: 0,
        };
      }
      return pos;
    })();

    setScale({
      width,
      height,
    });

    setPosition(scalePosition);

    setBounds({
      left: px - width,
      top: px - height,
      right: 0,
      bottom: 0,
    });
  };

  React.useEffect(() => {
    positionImage();
  }, []);
  React.useEffect(() => {
    positionImage();
  }, [image, zoom]);

  return (
    <div className={cs.root} style={{ height: px, width: px }}>
      <Draggable
        bounds={bounds}
        scale={zoom}
        position={position}
        onDrag={(_, { x, y }) => {
          setPosition({ x, y });
          positionImage();
        }}
        onStop={(_, { x, y }) => {
          setPosition({ x, y });
        }}
      >
        <img
          src={image?.src}
          style={scale}
          onClick={(e) => e.preventDefault()}
          draggable={false}
        />
      </Draggable>
    </div>
  );
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
