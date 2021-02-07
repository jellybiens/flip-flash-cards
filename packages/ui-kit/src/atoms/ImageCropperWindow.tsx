import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Draggable from 'react-draggable';
import { usePreventScroll } from '../helpers';
import { Position, Scale, useCropDispatch } from '../context/CroppingContextProvider';

const useStyles = makeStyles(() => ({
  root: { overflow: 'hidden', outline: 'solid 1px black' },
}));

type ImageCropperWindowProps = {
  image: HTMLImageElement;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  px?: number;
};

export const ImageCropperWindow: React.FC<ImageCropperWindowProps> = ({
  image,
  zoom = 1,
  zoomIn,
  zoomOut,
  px = 300,
}) => {
  const cs = useStyles();
  const { disableScroll, enableScroll } = usePreventScroll();
  const [bounds, setBounds] = React.useState<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }>(null);
  const { setPosition, setScale } = useCropDispatch();

  const [localPosition, setLocalPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [localScale, setLocalScale] = React.useState<Scale>({ height: px, width: px });

  const positionImage = (dragPos: Position, stop = false) => {
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
      let pos = { ...dragPos };
      const half = px / 2;
      const [centreX, centreY] = [-pos.x + half, -pos.y + half];
      const [newCentreX, newCentreY] =
        localScale.width < width
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

    setLocalPosition(scalePosition);
    setLocalScale({
      width,
      height,
    });

    // when we stop moving so formik values on
    // of a parent above dont constantly update
    if (stop) {
      setPosition(scalePosition);
      setScale({
        width,
        height,
      });
    }

    setBounds({
      left: px - width,
      top: px - height,
      right: 0,
      bottom: 0,
    });
  };

  const handleWheelEvent = (e: React.WheelEvent<HTMLSpanElement>) => {
    const dir = Math.sign(e.deltaY);
    if (dir === -1) zoomIn();
    if (dir === 1) zoomOut();
  };

  React.useEffect(() => {
    positionImage(localPosition);
  }, []);
  React.useEffect(() => {
    positionImage(localPosition, true);
  }, [image, zoom]);

  return (
    <div
      className={cs.root}
      style={{ height: px, width: px }}
      onWheel={handleWheelEvent}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    >
      <Draggable
        bounds={bounds}
        scale={zoom}
        position={localPosition}
        onDrag={(_, dragPos) => {
          positionImage(dragPos);
        }}
        onStop={(_, dragPos) => {
          positionImage(dragPos, true);
        }}
      >
        <img
          src={image?.src}
          style={localScale}
          onClick={(e) => e.preventDefault()}
          draggable={false}
        />
      </Draggable>
    </div>
  );
};
