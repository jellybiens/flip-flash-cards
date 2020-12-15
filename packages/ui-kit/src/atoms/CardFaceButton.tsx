import * as React from 'react';
import { makeStyles, Theme, ButtonBase, ButtonBaseProps, Hidden } from '@material-ui/core';
import { CardFace, CardFaceProps } from './CardFace';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: '100%',
      width: '100%',
      borderStyle: 'groove inset',
      boxShadow: `grey inset 0px 3px 3px;`,
      borderRadius: 5,
      overflow: 'hidden',
      '&:hover': {
        transform: 'scale(1.02)',
        filter: 'brightness(0.95)',
        '&:active': {
          transform: 'scale(1)',
        },
      },
    },
    button: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      overflow: 'hidden',
      transform: 'scale(1.01)',
    },
  };
});

type CardFaceButtonProps = ButtonBaseProps & CardFaceProps;

export const CardFaceButton: React.FC<CardFaceButtonProps> = ({ text, imgLink, ...props }) => {
  const cs = useStyles();

  return (
    <div className={cs.root}>
      <ButtonBase className={cs.button} {...props}>
        <CardFace text={text} imgLink={imgLink} />
      </ButtonBase>
    </div>
  );
};
