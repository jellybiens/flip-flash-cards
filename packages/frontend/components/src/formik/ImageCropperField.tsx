import { FastField, useField } from 'formik';
import * as React from 'react';
import {
  CroppingContextProvider,
  useCropDispatch,
  useCropState,
} from '../context/CroppingContextProvider';
import { useWindowSize } from '../helpers';
import { ImageCropper, ImageCropperProps } from '../molecules/ImageCropper';

type ImageCropperFieldProps = Omit<ImageCropperProps, 'src' | 'handleAddImage'> & {
  name?: string;
};

const ImageCropperChild: React.FC<ImageCropperFieldProps> = ({
  name = 'imageCropArgs',
  px = 300,
  ...props
}) => {
  const { width: windowInnerWidth } = useWindowSize();
  const { image, position, scale } = useCropState();
  const { setSrc } = useCropDispatch();

  const [, , { setValue }] = useField(name);

  const uploadInput = React.useRef<HTMLInputElement>();

  React.useEffect(() => setValue({ image, position, scale, px }), [
    image,
    position,
    scale,
    px,
    windowInnerWidth,
  ]);

  return (
    <>
      <ImageCropper
        handleAddImage={() => uploadInput.current.click()}
        px={px}
        {...props}
      />
      <input
        hidden
        ref={uploadInput}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          setSrc(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </>
  );
};

export const ImageCropperField: React.FC<ImageCropperFieldProps> = (props) => (
  <CroppingContextProvider>
    <FastField name={props.name}>{() => <ImageCropperChild {...props} />}</FastField>
  </CroppingContextProvider>
);
