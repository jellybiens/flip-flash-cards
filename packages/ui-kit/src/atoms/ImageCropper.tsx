import * as React from 'react';
import { Grid, makeStyles, Slider, Theme } from '@material-ui/core';
import Draggable from 'react-draggable';
import { SquareButton } from './Buttons';

const useStyles = makeStyles((theme: Theme) => ({
  root: { height: 300, width: 300, overflow: 'hidden', outline: 'solid 1px black' },
}));

type ImageCropperProps = {
  image: string;
  setCroppedImage: (image: string) => void;
  px?: number;
};

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image: source,
  setCroppedImage,
  px = 300,
}) => {
  const cs = useStyles();
  const [image, setImage] = React.useState<HTMLImageElement>(null);
  const [bounds, setBounds] = React.useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }>(null);
  const [scale, setScale] = React.useState<{ width: number; height: number }>({
    height: px,
    width: px,
  });
  const [position, setPosition] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);

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
    void createImage(source).then((i) => setImage(i));
  }, []);

  React.useEffect(() => {
    if (image) positionImage();
  }, [image, zoom]);

  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, {
        x: -position.x,
        y: -position.y,
        scale: zoom,
      });
      setCroppedImage(croppedImage);
    } catch (e) {
      // TODO: Toaster
      console.log('Crop Failure:', e);
    }
  }, [image, source, position, zoom]);

  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <div className={cs.root}>
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
      </Grid>
      <Grid item xs={6}>
        scale: {JSON.stringify(scale)} <br /> <br />
        position: {JSON.stringify(position)} <br /> <br />
        zoom: {JSON.stringify(zoom)} <br /> <br />
        bounds: {JSON.stringify(bounds)}
      </Grid>
      <Grid item xs={12}>
        <Slider
          value={zoom}
          min={1}
          max={2}
          step={0.05}
          aria-labelledby="Zoom"
          onChange={(_, zoom: number) => setZoom(zoom)}
        />
        <SquareButton colour="turquoise" onClick={showCroppedImage}>
          Crop
        </SquareButton>
      </Grid>
    </Grid>
  );
};

// const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

// const onCropComplete = React.useCallback((_, croppedAreaPixels) => {
//   setCroppedAreaPixels(croppedAreaPixels);
// }, []);

// const showCroppedImage = React.useCallback(async () => {
//   try {
//     const croppedImage = await getCroppedImg(image, croppedAreaPixels, 0);
//     setCroppedImage(croppedImage);
//   } catch (e) {
//     // TODO: Toaster
//     console.log('Crop Failure:', e);
//   }
// }, [croppedAreaPixels]);

const createImage = (url) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
  });
};

const getCroppedImg = async (
  image: HTMLImageElement,
  { scale, x, y }: { scale: number; x: number; y: number },
) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 300;
  canvas.height = 300;
  console.log(image, x, y, image.width, image.height, 0, 0, 300, 300);
  ctx.drawImage(image, x, y, image.width, image.height); //, x, y, image.width * scale, image.width * scale, 0, 0, 300, 300);

  return new Promise<string>((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/png');
  });
};
