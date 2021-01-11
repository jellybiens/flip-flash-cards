import { ButtonBase, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CardPixels, DeckOverviewProps } from '@types';
import clsx from 'clsx';
import * as React from 'react';
import { SquareButton } from '../atoms/Buttons';
import { Modal, ModalProps } from './Modal';
import { StarRatingTotal } from '../atoms/StarRatingTotal';
import { FlipCardColours, Icons } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardColours(theme),
    root: {
      height: '100%',
      width: '100%',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 3,
      padding: 10,
    },
    closeButton: {
      height: 20,
      width: 20,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    image: {
      [theme.breakpoints.only('xs')]: {
        height: `calc(${CardPixels.xs}px * 0.8)`,
        width: `calc(${CardPixels.xs}px * 0.8)`,
      },
      [theme.breakpoints.only('sm')]: {
        height: `calc(${CardPixels.sm}px * 0.8)`,
        width: `calc(${CardPixels.sm}px * 0.8)`,
      },
      [theme.breakpoints.only('md')]: {
        height: `calc(${CardPixels.md}px * 0.8)`,
        width: `calc(${CardPixels.md}px * 0.8)`,
      },
      [theme.breakpoints.only('lg')]: {
        height: `calc(${CardPixels.lg}px * 0.8)`,
        width: `calc(${CardPixels.lg}px * 0.8)`,
      },
      [theme.breakpoints.only('xl')]: {
        height: `calc(${CardPixels.xl}px * 0.8)`,
        width: `calc(${CardPixels.xl}px * 0.8)`,
      },
      margin: 'auto',
      borderRadius: 10,
      borderStyle: 'solid',
      borderColor: 'inherit',
    },
    itemWrapper: {
      height: 'fit-content',
      width: 'fit-content',
      borderColor: 'inherit',
      margin: 'auto',
    },
    starWrapper: {
      float: 'right',
      height: 'fit-content',
      width: 'fit-content',
    },
    totalWrapper: {
      float: 'left',
      height: 'fit-content',
      width: 'fit-content',
    },
  };
});

type PlayDeckModalProps = ModalProps & Omit<DeckOverviewProps, 'subject'>;

const Clear = Icons.cross;

export const PlayDeckModal: React.FC<PlayDeckModalProps> = ({
  deckId,
  title,
  imgLink,
  colour,
  cards,
  score,
  totalVotes,
  onClose,
  ...props
}) => {
  const cs = useStyles();
  return (
    <Modal key={deckId} {...props}>
      <div className={clsx(cs.root, cs[`${colour}Card`])}>
        <Grid
          container
          style={{ height: '100%', position: 'relative', borderColor: 'inherit' }}
        >
          <ButtonBase className={cs.closeButton} onClick={() => onClose()}>
            <Clear className={cs.closeButton} />
          </ButtonBase>
          <Grid item xs={12} style={{ height: '10%' }}>
            <div className={cs.itemWrapper}>
              <Typography variant="h4">{title}</Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: '66%', display: 'flex', borderColor: 'inherit' }}
          >
            <img src={imgLink} className={cs.image} />
          </Grid>
          <Grid item xs={6} style={{ height: '7%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <Typography>Total cards: {cards.length}</Typography>
            </div>
          </Grid>
          <Grid item xs={6} style={{ height: '7%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <StarRatingTotal avgRating={score} totalVotes={totalVotes} />
            </div>
          </Grid>
          <Grid item xs={12} style={{ height: '17%', display: 'flex' }}>
            <div className={cs.itemWrapper}>
              <SquareButton colour={colour === 'cyan' ? 'green' : 'cyan'} size="large">
                Play
              </SquareButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};
