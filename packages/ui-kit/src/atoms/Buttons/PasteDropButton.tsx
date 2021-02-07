import * as React from 'react';
import AddImage from '../../images/addImage.png';
import { ButtonBase, ButtonBaseProps, Input, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {},
  buttonWrapper: {
    overflow: 'hidden',
    height: '50%',
    width: '50%',
    position: 'relative',
    top: '25%',
    left: '25%',
    borderRadius: 15,
    boxShadow: `
      ${theme.palette.silver.dark} 2px 2px 2px, 
      ${theme.palette.silver.dark} 2px -2px 2px,
      ${theme.palette.silver.dark} -2px 2px 2px, 
      ${theme.palette.silver.dark} -2px -2px 2px
    `,
    '&:hover': {
      transform: 'scale(1.05)',
      '&:active': {
        transform: 'scale(1)',
      },
    },
  },
  buttonImg: {
    backgroundImage: `url(${AddImage as string})`,
    backgroundSize: 'contain',
    height: '100%',
    width: '100%',
  },
  buttonInput: {
    cursor: 'pointer',
    height: '100%',
    width: '100%',
    opacity: 0,
  },
}));

export type PasteDropButtonProps = Pick<ButtonBaseProps, 'onClick'> & {
  handleReturnSrc: (imageSrc: string) => void;
};

export const PasteDropButton: React.FC<PasteDropButtonProps> = ({
  handleReturnSrc,
  onClick,
}) => {
  const cs = useStyles();

  const pasteRef = React.useRef<HTMLInputElement>();
  const handlePaste = (e: ClipboardEvent) => {
    const image = e.clipboardData.files[0];
    const imageUrl = image ? URL.createObjectURL(image) : e.clipboardData.getData('Text');

    handleReturnSrc(imageUrl);
  };

  React.useEffect(() => {
    if (pasteRef?.current) {
      pasteRef.current.addEventListener('paste', handlePaste);
    }
    return () => {
      if (pasteRef?.current) pasteRef.current.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <ButtonBase className={cs.buttonWrapper} onClick={onClick}>
      <Input
        disableUnderline={true}
        className={cs.buttonImg}
        ref={pasteRef}
        inputProps={{ className: cs.buttonInput }}
      />
    </ButtonBase>
  );
};
