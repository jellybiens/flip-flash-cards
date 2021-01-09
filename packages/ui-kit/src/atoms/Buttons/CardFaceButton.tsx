import * as React from 'react';
import { makeStyles, ButtonBase, ButtonBaseProps, Theme } from '@material-ui/core';
import { CardFace } from '../CardFace';
import { CardFaceProps } from '@types';
import { FlipCardColours } from '../../definitions';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: '100%',
      width: '100%',
      borderStyle: 'solid !important',
      boxShadow: `grey inset 0px 3px 3px, grey 0px 6px 7px;`,
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
    ...FlipCardColours(theme),
  };
});

type CardFaceButtonProps = ButtonBaseProps & CardFaceProps;

export const CardFaceButton: React.FC<CardFaceButtonProps> = ({
  text,
  imgLink,
  colour,
  ...props
}) => {
  const cs = useStyles();

  return (
    <div className={clsx(cs.root, cs[`${colour}Card`])}>
      <ButtonBase className={cs.button} {...props}>
        <CardFace text={text} imgLink={imgLink} colour={colour} />
      </ButtonBase>
    </div>
  );
};
